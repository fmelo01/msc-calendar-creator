import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectDaysService {

  selectedDays: Set<string>;

  constructor() {
    this.selectedDays = new Set<string>();
  }

  selectDay(day: Date) {
    this.selectedDays.add(day.toISOString());
  }

  unselectDay(day: Date) {
    this.selectedDays.delete(day.toISOString());
  }

  isDaySelected(day: Date): boolean {
    return this.selectedDays.has(day.toISOString());
  }

}
