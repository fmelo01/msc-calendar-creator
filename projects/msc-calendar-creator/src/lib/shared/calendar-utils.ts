import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDay, differenceInCalendarDays, isThisMonth, isPast, isToday, isWeekend, isFuture } from 'date-fns';
import { CalendarConstants } from './calendar-constants';
import * as chunk from 'chunk';

export class CalendarUtils {

  constructor() { }

  static getFirstCalendarDay(month: Date): Date {
    const firstMonthDay = startOfMonth(month);
    return startOfWeek(firstMonthDay);
  }

  static getLastCalendarDay(month: Date): Date {
    const lastMonthDay = endOfMonth(month);
    return endOfWeek(lastMonthDay);
  }

  static getAllDaysOfCalendarMonth(month: Date): Array<Date> {
    const start = this.getFirstCalendarDay(month);
    const end = this.getLastCalendarDay(month);
    const days = eachDay(start, end);

    return days;
  }

  static getAllRowsOfCalendarMonth(month: Date): Array<Array<Date>> {
    const calendarDays = this.getAllDaysOfCalendarMonth(month);
    return chunk.chunk(calendarDays, CalendarConstants.COLUMNS_IN_ROW);
  }

  static countCalendarRows(month: Date): number {
    const start = this.getFirstCalendarDay(month);
    const end = this.getLastCalendarDay(month);
    const totalDays = differenceInCalendarDays(end, start) + 1;
    const rows = totalDays / CalendarConstants.COLUMNS_IN_ROW;
    return rows;
  }

  static getDayPositionInCalendar(targetDay: Date, calendarMonth: Date): { index: number, column: number, row: number } {
    const firstCalendarDay = this.getFirstCalendarDay(calendarMonth);
    const daysBetween = differenceInCalendarDays(targetDay, firstCalendarDay);

    const row = daysBetween % CalendarConstants.COLUMNS_IN_ROW;
    const column = Math.trunc(daysBetween / CalendarConstants.COLUMNS_IN_ROW);

    return {
      index: daysBetween,
      column: row,
      row: column
    };
  }

  static hasSameNumberOfRowsInCalendar(month1: Date, month2: Date): boolean {
    const currNumberOfRows = this.countCalendarRows(month1);
    const nextNumberOfRows = this.countCalendarRows(month2);
    return currNumberOfRows === nextNumberOfRows;
  }

  static getDayAttributes(day: Date): Array<string> {
    const attributes = {
      'in-month' : isThisMonth(day),
      'is-past' : isPast(day) && !isToday(day),
      'is-today' : isToday(day),
      'is-future' : isFuture(day) && !isToday(day),
      'is-weekend' : isWeekend(day)
    };
    return Object.keys(attributes).filter(key => attributes[key])
  }

}
