import { updateDate } from 'ionic-angular/es2015/util/datetime-util';
import { UserIn } from '../../../models/users';
import { TransactionIn } from '../../../models/transaction';
import { CardIn } from '../../../models/card';
import { Component, ElementRef, } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, DateTime } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { Database } from '../../../providers/database';
import { ArraysProvider } from '../../../providers/arrays';

/**
 * Generated class for the ViewTransactionHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-transaction-history',
  templateUrl: 'view-transaction-history.html',
})
export class ViewTransactionHistory {

  user: UserIn;
  all_transactions = [] as TransactionIn[];
  filteredTransactions = [] as TransactionIn[][];
  years: number[];
  months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  month_ui;
  days: number[] = [1, 2, 3];
  dateTime: any = {
    year: null,
    month: null,
    day: null
  };
  ui_dateTime: any = {
    year: null,
    month: null,
    day: null
  };
  disableDay: boolean = true;

  yearlyView: boolean = true;
  monthlyView: boolean;
  dailyView: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private db: Database, private auth: Auth, private arrays: ArraysProvider, private elRef: ElementRef) {
    this.user = this.navParams.get("user");
    this.refresh();
  }

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
    return all_transactions
  }

  async refresh() {
    let loading = this.loading();
    loading.present();
    this.all_transactions = await this.getTransactions();
    console.log(this.all_transactions);
    if(this.all_transactions.length > 0) {
      console.log(this.all_transactions.length);
      this.years = this.getYearRange(this.arrays.justGroupByMonth(this.all_transactions));
      this.dateTime.year = this.years[0].toString();
      this.ui_dateTime.year = this.years[0].toString();
    }

    this.filterTransactions("year");
    loading.dismiss();
  }

  private getYearRange(groupedTransactions: TransactionIn[][]) {
    let index1 = groupedTransactions.length;
    let start = this.arrays.getYear(groupedTransactions[index1 - 1][0]);
    let end = this.arrays.getYear(groupedTransactions[0][0]);
    let years: number[] = [];
    for (let i = end; i >= start; i--) {
      years.push(i);
    };
    return years;
  }

  getFormattedDateMonth(transaction: TransactionIn) {
    return this.arrays.getFormattedDateMonth(transaction);
  }

  getFormattedDateDay(transaction: TransactionIn) {
    return this.arrays.getFormattedDateDay(transaction);
  }

  getFormattedDateHour(transaction: TransactionIn) {
    return this.arrays.getFormattedDateHour(transaction);
  }

  getFormattedDateMinutes(transaction: TransactionIn) {
    return this.arrays.getFormattedDateMinutes(transaction);
  }

  updatedDate(event: string) {
    if (event == "clear") {
      this.ui_dateTime = {
        year: this.years[0].toString(),
        month: null,
        day: null
      };
      this.dateTime = {
        year: this.years[0].toString(),
        month: null,
        day: null
      };
      this.disableDay = true;
      this.yearlyView = true;
      this.monthlyView = false;
      this.dailyView = false;
      this.filterTransactions("year");
    } else {
      switch (event) {
        case "year":
          this.dateTime.month = null;
          this.dateTime.day = null;
          this.ui_dateTime.month = null;
          this.ui_dateTime.day = null;
          break;
        case "month":
          this.dateTime.day = null;
          this.ui_dateTime.day = null;
          break;
        case "day":
          break
      }
      if (this.ui_dateTime.month != null) {
        this.days = this.getDays(this.dateTime.month);
        this.disableDay = false;
      } else {
        this.disableDay = true;
      }
      if (this.dateTime.month == null) {
        this.yearlyView = true;
        this.monthlyView = false;
        this.dailyView = false;
        this.filterTransactions("year");
      } else if (this.dateTime.day == null) {
        this.yearlyView = false;
        this.monthlyView = true;
        this.dailyView = false;
        this.filterTransactions("month");
      } else {
        this.yearlyView = false;
        this.monthlyView = false;
        this.dailyView = true;
        this.filterTransactions("day");
      }
    }


  }

  parseValue(type: string) {
    setTimeout(() => {
      let hElement: HTMLElement = this.elRef.nativeElement;
      let datetime_object = hElement.getElementsByClassName(type)[0];
      let datetime_text = datetime_object.getElementsByClassName("datetime-text")[0].textContent;
      this.dateTime[type] = datetime_text;
      if (datetime_text != "Month" && datetime_text != "Day") {
        this.updatedDate(type);
      }
    }, 20);
  }

  private getDays(month: string) {
    let days = new Date(parseInt(this.dateTime.year), this.months.indexOf(month) + 1, 0).getDate();
    let dates: number[] = [];
    for (let i = 1; i <= days; i++) {
      dates.push(i);
    }
    return dates;
  }

  filterTransactions(type: string) {
    switch (type) {
      case "year":
        this.filteredTransactions = this.arrays.groupByMonth(this.all_transactions, parseInt(this.dateTime.year));
        break;
      case "month":
        this.filteredTransactions = this.arrays.groupByDay(this.all_transactions, this.months.indexOf(this.dateTime.month) + 1, parseInt(this.dateTime.year));
        break;
      case "day":
        this.filteredTransactions = this.arrays.groupByHour(this.all_transactions, parseInt(this.dateTime.day), this.months.indexOf(this.dateTime.month) + 1, parseInt(this.dateTime.year));
        break;
    }
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }
}
