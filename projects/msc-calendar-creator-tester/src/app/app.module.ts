import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MscCalendarCreatorModule } from '@msc/calendar-creator';

import { AppComponent } from './app.component';
import { CalendarDayComponent } from './reservation-calendar/reservation-day/calendar-day.component';
import { ReservationCalendarComponent } from './reservation-calendar/reservation-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarDayComponent,
    ReservationCalendarComponent
  ],
  imports: [
    BrowserModule,
    MscCalendarCreatorModule
  ],
  entryComponents: [
    CalendarDayComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en_US' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
