import { Component, OnInit, Input, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import {
  subMonths,
  addMonths
} from 'date-fns';
import * as moment from 'moment';

@Component({
  selector: 'msc-calendar-panel',
  templateUrl: './calendar-panel.component.html',
  styleUrls: ['../shared/calendar-common.css', './calendar-panel.component.css']
})
export class CalendarPanelComponent implements OnInit {

  @Input() displayMonth: Date;
  @Output() displayMonthChange = new EventEmitter<Date>();

  constructor(@Inject(LOCALE_ID) private locale: string) {
    moment.locale(locale);
  }

  ngOnInit() {
    this.displayMonth = new Date();
  }

  get displayMonthName(): string {
    const monthNum = this.displayMonth.getMonth();
    return moment.months()[monthNum];
  }

  get displayYear(): number {
    return this.displayMonth.getFullYear();
  }

  nextMonth(): void {
    this.displayMonth = addMonths(this.displayMonth, 1);
    this.displayMonthChange.emit(this.displayMonth);
  }

  prevMonth(): void {
    this.displayMonth = subMonths(this.displayMonth, 1);
    this.displayMonthChange.emit(this.displayMonth);
  }

}
