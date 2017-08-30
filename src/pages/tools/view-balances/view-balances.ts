import { Payment } from '../../../models/payment';
import { TransactionIn } from '../../../models/transaction';
import { UserIn } from '../../../models/users';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams, AlertController } from 'ionic-angular';
import { Database } from '../../../providers/database';
import { Auth } from '../../../providers/auth';
import { ArraysProvider } from '../../../providers/arrays';
/**
 * Generated class for the ViewBalancesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-balances',
  templateUrl: 'view-balances.html',
})
export class ViewBalances {

  user: UserIn;

  admin: boolean = false;

  charity: boolean = false;

  transactions = [] as TransactionIn[];

  total_balances = { net: 0, inflow: 0, outflow: 0 };

  all_items = [] as any[];

  all_items_grouped = [] as any[][]; //[Month][Date][Items: Payment / Transaction]

  sent_payments = [] as Payment[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private db: Database, private auth: Auth, private arrays: ArraysProvider) {

    this.user = this.navParams.get("user");
    this.admin = this.auth.current_user.accountType == "Admin";
    this.charity = this.auth.current_user.accountType == "Charity";
    let loading = this.loading();
    loading.present();
    this.getTransactions().then(() => {
      this.refresh().then(() => {
        loading.dismiss();
      });
    });
  }

  async refresh() {
    let all_payments = await this.getPayments();
    let sent_payments: Payment[] = await this.db.getAll("db", "payments", "from_id", this.user.id, -1);
    this.sent_payments = sent_payments.filter((payment) => {
      return !payment.confirmed && !payment.rejected;
    });
    this.all_items = [].concat(all_payments);
    this.all_items = this.all_items.concat(this.transactions);
    this.all_items_grouped = this.arrays.justGroupByMonth(this.all_items);
    this.total_balances = this.calculateBalances(this.all_items);
    console.log(this.all_items_grouped);
  }

  //Get All Payment Histories of This User and Group Them by Month
  async getPayments() {
    let all_payments: Payment[];
    switch (this.user.accountType) {
      case "Admin":
        all_payments = await this.db.getTable("db", "payments");
        break;
      case "Hawker":
        all_payments = await this.db.getAll("db", "payments", "to_id", this.user.id, -1);
        break;
      case "Charity":
        all_payments = await this.db.getAll("db", "payments", "from_id", this.user.id, -1);
        break;
    }
    return all_payments
  }

  //Get All Transaction Histories of This User
  async getTransactions() {
    let all_transactions: TransactionIn[];
    switch (this.user.accountType) {
      case "Admin":
        all_transactions = await this.db.getTable("db", "transactions");
        break;
      case "Hawker":
        all_transactions = await this.db.getAll("db", "transactions", "hawkerID", this.user.id, -1);
        break;
      case "Charity":
        all_transactions = await this.db.getAll("db", "transactions", "charityID", this.user.id, -1);
        break;
    }
    this.transactions = all_transactions;
  }

  calculateBalances(items: any[]) {
    let inflow = 0;
    let outflow = 0;
    if (this.admin && this.user.accountType == "Admin") {
      for (let item of items) {
        if (this.isPayment(item) && item.confirmed) {
          let amount = this.getPaymentAmount(item);
          if (amount > 0) {
            inflow += amount;
          } else {
            outflow -= amount;
          }
        }
      };
    } else {
      for (let item of items) {
        if (this.isPayment(item) && item.confirmed) {
          inflow += item.amount;
        } else if (!this.isPayment(item)) {
          outflow += 2.5;
        }
      };
    }
    return {
      net: inflow - outflow,
      inflow: inflow,
      outflow: outflow
    }
  }

  async createPayment(amount: number) {
    let loading = this.loading();
    loading.present();
    let adminUser: UserIn = (await this.db.getAll("auth", "users", "accountType", "Admin", 1))[0];
    let payment: Payment = {
      from_id: this.auth.current_user.id,
      from_name: this.auth.current_user.name,
      to_id: adminUser.id,
      to_name: adminUser.name,
      amount: amount,
      type: this.auth.current_user.accountType,
      confirmed: false,
      rejected: false
    };
    let response = await this.db.uploadPayment(payment);
    await this.refresh();
    loading.dismiss();
    return response;
  }

  async presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Send Payment',
      inputs: [
        {
          name: 'Amount',
          placeholder: 'Amount',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Send',
          handler: (data) => {
            this.createPayment(data.Amount).then((response) => {
              console.log(response);
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  async confirm(payment: Payment, confirmed: boolean) {
    let loading = this.loading();
    if (confirmed) {
      payment.confirmed = true;
      payment.rejected = false;
    } else {
      payment.confirmed = false;
      payment.rejected = true;
    }
    loading.present();
    let response = await this.db.updateItem("payment", payment.id, payment);
    await this.refresh();
    loading.dismiss();
  }

  getFormattedDateMonth(payment: Payment) {
    if (payment) {
      return this.arrays.getFormattedDateMonth(payment);
    } else {
      return "";
    }
  }

  getFormattedDateDay(payment: Payment) {
    if (payment) {
      return this.arrays.getFormattedDateDay(payment);
    } else {
      return "";
    }
  }

  isPayment(item: any) {
    return "to_id" in item;
  }

  hasPayments(items: any[]) {
    let filtered = items.filter((item) => {
      return this.isPayment(item) && item.confirmed;
    });
    return (filtered.length > 0);
  }

  onlyConfirmedPayments(items: any[]) {
    let filtered = items.filter((item) => {
      return this.isPayment(item) && item.confirmed;
    });
    return filtered;
  }

  getPaymentAmount(payment: Payment) {
    if (this.user.accountType == "Admin") {
      if (payment.to_id == this.user.id) {
        return payment.amount;
      } else {
        return -payment.amount;
      }
    } else {
      return payment.amount;
    }
  }

  countRedemptions(items: any[]) {
    let filtered = items.filter((item) => {
      return !this.isPayment(item);
    });
    return filtered.length;
  }

  onlyPendingPayments(items: any[]) {
    let filtered = items.filter((item) => {
      return this.isPayment(item) && !item.confirmed && !item.rejected && this.user.id == item.to_id;
    });
    return filtered;
  }

  hasPendingPayments(items: any[]) {
    let filtered = items.filter((item) => {
      return this.isPayment(item) && !item.confirmed && !item.rejected && this.user.id == item.to_id;
    });
    return (filtered.length > 0);
  }

  gotoPayment() {
    this.navCtrl.push("AdminPayment", { user: this.auth.current_user });
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }


  getPaymentText(payment: Payment) {
    if(payment.from_id == this.user.id) {
      return "To " + payment.to_name + " ";
    } else if(payment.to_id == this.user.id){
      return "From " + payment.from_name + " ";
    } else {
      return "Error ";
    }
  }
}
