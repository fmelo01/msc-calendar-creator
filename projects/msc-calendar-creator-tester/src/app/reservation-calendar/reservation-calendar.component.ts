import { Component, OnInit } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DayComponent } from '@msc/calendar-creator';

import { CalendarDayComponent } from './reservation-day/calendar-day.component';

@Component({
  selector: 'app-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.css']
})
export class ReservationCalendarComponent implements OnInit {
  displayMonth: Date = new Date();
  componentType: ComponentType<DayComponent> = CalendarDayComponent;

  constructor() { }

  ngOnInit() {
  }

}
