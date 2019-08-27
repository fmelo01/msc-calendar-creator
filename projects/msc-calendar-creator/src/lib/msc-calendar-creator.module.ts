import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';

import { CalendarPanelComponent } from './calendar-panel/calendar-panel.component';
import { CalendarDaysHeaderComponent } from './calendar-days-header/calendar-days-header.component';
import { CalendarDaysComponent } from './calendar-days/calendar-days.component';

@NgModule({
  declarations: [
    CalendarPanelComponent,
    CalendarDaysHeaderComponent,
    CalendarDaysComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    PortalModule
  ],
  exports: [
    CalendarPanelComponent,
    CalendarDaysHeaderComponent,
    CalendarDaysComponent
  ]
})
export class MscCalendarCreatorModule { }
