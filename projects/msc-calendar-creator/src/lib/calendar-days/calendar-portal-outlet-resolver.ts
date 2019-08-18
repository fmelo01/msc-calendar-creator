import { CdkPortalOutlet } from '@angular/cdk/portal';
import { CalendarUtils } from '../shared/calendar-utils';

export class CalendarPortalOutletResolver {

  constructor(private portalOutlets: Array<CdkPortalOutlet>, private month: Date) {
  }

  resolvePortalOutletByDate(day: Date): CdkPortalOutlet {
    const dayPosition = CalendarUtils.getDayPositionInCalendar(day, this.month);
    return this.portalOutlets[dayPosition.index];
  }

  forEach(forEachCallback: (portalOutlet: CdkPortalOutlet, day: Date) => void) {
    const calendarDays = CalendarUtils.getAllDaysOfCalendarMonth(this.month);
    for (let i = 0; i < this.portalOutlets.length; i++) {
      const portalOutlet = this.portalOutlets[i];
      const calendarDay = calendarDays[i];

      forEachCallback(portalOutlet, calendarDay);
    }
  }

}
