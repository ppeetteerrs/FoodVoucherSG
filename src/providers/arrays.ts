import { Payment } from '../models/payment';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

/*
  Generated class for the ArraysProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ArraysProvider {

  constructor() {
  }

  private adjustTimezone(date: Date) {
    return moment(date).add(0,'h');
  }

  justGroupByMonth(itemsArray: any[]) {
    itemsArray = this.sortByMilliseconds(itemsArray);
    let grouped = _.groupBy(itemsArray, (item) => {
      return (parseInt(this.adjustTimezone(item.date).format("M"))+parseInt(this.adjustTimezone(item.date).format("YYYY"))*10000);
    });
    let sorted = _.reverse(_.sortBy(grouped, "key"));
    return sorted;
  }

  groupByMonth(itemsArray: any[], year: number) {
    //Choose Items of That Year
    itemsArray = this.sortByMilliseconds(itemsArray.filter((item) => {
      return parseInt(this.adjustTimezone(item.date).format("YYYY")) == year;
    }));
    let grouped = _.groupBy(itemsArray, (item) => {
      return (parseInt(this.adjustTimezone(item.date).format("M"))+parseInt(this.adjustTimezone(item.date).format("YYYY"))*10000);
    });
    let sorted = _.reverse(_.sortBy(grouped, "key"));
    return sorted;
  }

  groupByDay(itemsArray: any[], month: number /**Month NOT Zero-based*/, year: number) {
    //Choose Items of That Month
    itemsArray = this.sortByMilliseconds(itemsArray.filter((item) => {
      return parseInt(this.adjustTimezone(item.date).format("M")) == month && parseInt(this.adjustTimezone(item.date).format("YYYY")) == year;
    }));
    let grouped = _.groupBy(itemsArray, (item) => {
      return (parseInt(this.adjustTimezone(item.date).format("D"))+parseInt(this.adjustTimezone(item.date).format("M"))*100+parseInt(this.adjustTimezone(item.date).format("YYYY"))*10000);
    });
    let sorted = _.reverse(_.sortBy(grouped, "key"));
    return sorted;
  }

  groupByHour(itemsArray: any[], day: number, month: number /**Month NOT Zero-based*/, year: number) {
    //Choose Items of That Day
    itemsArray = this.sortByMilliseconds(itemsArray.filter((item) => {
      return parseInt(this.adjustTimezone(item.date).format("D")) == day && parseInt(this.adjustTimezone(item.date).format("M")) == month && parseInt(this.adjustTimezone(item.date).format("YYYY")) == year;
    }));
    let grouped = _.groupBy(itemsArray, (item) => {
      return (parseInt(this.adjustTimezone(item.date).format("H")) + parseInt(this.adjustTimezone(item.date).format("D"))*100+parseInt(this.adjustTimezone(item.date).format("M"))*10000+parseInt(this.adjustTimezone(item.date).format("YYYY"))*1000000);
    });
    let sorted = _.reverse(_.sortBy(grouped, "key"));
    return sorted;
  }

  getFormattedDateMonth(item: any){
    let date = item.date;
    return this.adjustTimezone(date).format("MMMM") + " " + this.adjustTimezone(date).format("YYYY");
  }

  getFormattedDateDay(item: any){
    let date = item.date;
    return this.adjustTimezone(date).format("D") + " " + this.adjustTimezone(date).format("MMM");
  }

  getFormattedDateHour(item: any){
    let date = item.date;
    return this.adjustTimezone(date).format("h A");
  }

  getFormattedDateMinutes(item: any){
    let date = item.date;
    return this.adjustTimezone(date).format("H:mm");
  }

  getDate(item: any){
    let date = item.date;
    return this.adjustTimezone(date).get("date");
  }

  getMonth(item: any){
    let date = item.date;
    return this.adjustTimezone(date).get("month") + 1;
  }

  getYear(item: any){
    let date = item.date;
    return this.adjustTimezone(date).get("year");
  }

  sortByMilliseconds(items: any[]) {
    let sorted = _.reverse(_.sortBy(items, (item) => {
      return parseInt(this.adjustTimezone(item.date).format("x"))
    }));
    return sorted;
  }

}
