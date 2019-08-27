import { Injectable } from '@angular/core';
import { DistinctDays } from '@msc/calendar-creator';

@Injectable({
  providedIn: 'root'
})
export class SelectDaysService {
  days: DistinctDays;

  constructor() {
    this.days = new DistinctDays();
  }

  selectDay(day: Date) {
    this.days.add(day);
  }

  unselectDay(day: Date) {
    this.days.delete(day);
  }

  isDaySelected(day: Date): boolean {
    return this.days.has(day);
  }

}
