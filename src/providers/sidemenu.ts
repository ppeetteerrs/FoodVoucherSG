import { Injectable } from '@angular/core';

/*
  Generated class for the Sidemenu provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SideMenu {

  pages = {
    Admin : [
      {name: "Home", page: "ViewBalances", params: {}, icon: "home"},
      {name: "Create User", page: "AdminRegister", params: {}, icon: "person-add"},
      {name: "Create Cards", page: "AdminBarcode", params: {}, icon: "barcode"},
      {name: "Scan Barcode", page: "AdminValidate", params: {}, icon: "search"},
      {name: "Records", page: "ViewTransactionHistory", params: {}, icon: "list"},
      {name: "Charities", page: "AdminCharity", params: {}, icon: "hand"},
      {name: "Hawkers", page: "AdminHawker", params: {}, icon: "cafe"},
      {name: "Send Payment", page: "AdminPayment", params: {}, icon: "logo-usd"}
    ],
    Hawker : [
      {name: "Home", page: "HawkerHome", params: {}, icon: "home"}, 
      {name: "Balances", page: "ViewBalances", params: {}, icon: "logo-usd"}, 
      {name: "Records", page: "ViewTransactionHistory", params: {}, icon: "list"}
    ],
    Charity : [
      {name: "Home", page: "ViewBalances", params: {}, icon: "home"},
      {name: "Activate Card", page: "CharityActivate", params: {}, icon: "barcode"},
      {name: "View Cards", page: "ViewCards", params: {}, icon: "albums"},
      {name: "Records", page: "ViewTransactionHistory", params: {}, icon: "list"},
      {name: "Card Batches", page: "ViewBatches", params: {}, icon: "folder"}
    ]
  }

  constructor() {
    
  }

}
