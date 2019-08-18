import { Component, OnInit, Inject, HostListener, HostBinding } from '@angular/core';
import { CALENDAR_DAY, DayComponent } from '@msc/calendar-creator';

import { SelectDaysService } from '../select-days.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit, DayComponent {

  @HostBinding('class.is-selected')
  isSelected: boolean;

  constructor(@Inject(CALENDAR_DAY) public calendarDay: Date, private selectDaysService: SelectDaysService) {

  }

  ngOnInit() {
    this.isSelected = this.selectDaysService.isDaySelected(this.calendarDay);
  }

  @HostListener('click')
  onDayClick(): void {
    this.isSelected = !this.isSelected;

    if (this.isSelected) {
      this.selectDaysService.selectDay(this.calendarDay);
    } else {
      this.selectDaysService.unselectDay(this.calendarDay);
    }
  }

}
