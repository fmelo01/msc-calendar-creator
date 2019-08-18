import { Renderer2, ComponentRef } from '@angular/core';
import { DayComponent } from '../shared/day-component';
import { CalendarUtils } from '../shared/calendar-utils';


export class CalendarDayStyler {

  constructor(private renderer: Renderer2) {}

  addAllClasses(componentRef: ComponentRef<DayComponent>, day: Date): void {
    const cssClasses = CalendarUtils.getDayAttributes(day);
    for (const cssClass of cssClasses) {
      this.renderer.addClass(componentRef.location.nativeElement, cssClass);
    }
  }

}
