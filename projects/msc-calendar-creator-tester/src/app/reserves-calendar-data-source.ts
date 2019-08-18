import { CalendarDataSource } from '@msc/calendar-creator';
import { Observable } from 'rxjs';

import { Reserve } from './reservation-calendar/reserve.model';
import { isSameDay } from 'date-fns';

export class ReservesCalendarDataSource implements CalendarDataSource<Reserve> {

  constructor(private reservedDays: Date[]) {

  }

  fetchCalendarData(day: Date): Reserve | Observable<Reserve> {
    const isDayReserved = this.reservedDays.every((currDay: Date) => isSameDay(day, currDay));
    return {
      isReserved: isDayReserved
    } as Reserve;
  }
}
