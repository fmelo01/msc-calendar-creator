import { Component, OnInit, Inject, LOCALE_ID, Input } from '@angular/core';
import * as moment from 'moment';
import { NameFormat } from './day-format';

@Component({
  selector: 'msc-calendar-days-header',
  templateUrl: './calendar-days-header.component.html',
  styleUrls: ['../shared/calendar-common.css', './calendar-days-header.component.scss']
})
export class CalendarDaysHeaderComponent implements OnInit {

  @Input() namesFormat: NameFormat;

  constructor(@Inject(LOCALE_ID) locale: string) {
    moment.locale(locale);
  }

  ngOnInit() {
  }

  getWeekdays(): Array<string> {
    switch (this.namesFormat) {
      case NameFormat.COMPLETE:
        return moment.weekdays();
      case NameFormat.SHORT:
        return moment.weekdaysShort();
      default:
        return moment.weekdaysShort();
    }
  }

}
