import { AfterViewInit, QueryList, Injector, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { CdkPortalOutlet, ComponentType } from '@angular/cdk/portal';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { CalendarPortalOutletResolver } from './calendar-portal-outlet-resolver';
import { CalendarConstants } from '../shared/calendar-constants';
import { CalendarUtils } from '../shared/calendar-utils';
import { ComponentDayFactory } from './component-day-factory';
import { DayComponent } from '../shared/day-component';
import { DayData } from '../shared/day-data';
import { CalendarDataSource } from '../shared/calendar-data-source';
import { CalendarDayStyler } from './calendar-day-styler';


export abstract class CalendarDaysPortalOutlet implements AfterViewInit {

  abstract dayPortalsOutlets: QueryList<CdkPortalOutlet>;

  private previousMonth: Date;

  private currentMonth: Date;

  private componentDayFactory: ComponentDayFactory;

  private calendarDayStyler: CalendarDayStyler;

  portalRows: Array<number>;

  portalColumns: Array<number>;

  constructor(private mChangeDetectionRef: ChangeDetectorRef,
              private mInjector: Injector,
              private renderer: Renderer2) {

    const columns = CalendarConstants.COLUMNS_IN_ROW;
    this.portalColumns = Array(columns);
    this.calendarDayStyler = new CalendarDayStyler(renderer);
  }

  initPortals(portalsMonth: Date, componentType: ComponentType<DayComponent>, calendarDataSource: CalendarDataSource<DayData>) {
    this.setCurrentMonth(portalsMonth);
    this.initCalendarRows(portalsMonth);
    this.componentDayFactory = new ComponentDayFactory(this.mInjector, componentType, calendarDataSource);
  }

  ngAfterViewInit(): void {
    const portals = this.dayPortalsOutlets.toArray();
    this.attachAllPortals(portals, this.currentMonth);
  }

  protected updateCalendarDays(month: Date) {
    this.setCurrentMonth(month);
    this.updateCalendarRows(month).subscribe((portals: Array<CdkPortalOutlet>) => {
      this.attachAllPortals(portals, month);
    });
  }

  private updateCalendarRows(month: Date): Observable<Array<CdkPortalOutlet>> {
    this.dettachAllPortals();

    if (CalendarUtils.hasSameNumberOfRowsInCalendar(this.getPreviousMonth(), this.getCurrentMonth())) {
      const portals = this.dayPortalsOutlets.toArray();
      return of(portals);
    }

    return new Observable<Array<CdkPortalOutlet>>((observer) => {
      this.dayPortalsOutlets
        .changes
        .pipe(first())
        .subscribe((changes: QueryList<CdkPortalOutlet>) => {
          observer.next(changes.toArray());
          observer.complete();
        });

      const rowsTotal = CalendarUtils.countCalendarRows(month);
      this.portalRows = Array(rowsTotal);
    });
  }

  private dettachAllPortals() {
    this.dayPortalsOutlets.forEach((portal: CdkPortalOutlet) => portal.detach());
  }

  private attachAllPortals(portals: Array<CdkPortalOutlet>, month: Date) {
    const portalOutletResolver = new CalendarPortalOutletResolver(portals, month);

    portalOutletResolver.forEach((currPortalOutlet: CdkPortalOutlet, currDay: Date) => {
      const dayComponent = this.componentDayFactory.createDayComponent(currDay);
      const componentRef = currPortalOutlet.attach(dayComponent);
      this.calendarDayStyler.addAllClasses(componentRef, currDay);
    });

    this.mChangeDetectionRef.detectChanges();
  }

  private initCalendarRows(month: Date) {
    const rowsTotal = CalendarUtils.countCalendarRows(month);
    this.portalRows = Array(rowsTotal);
  }

  private getPreviousMonth() {
    return this.previousMonth;
  }

  private setCurrentMonth(month: Date) {
    this.previousMonth = this.currentMonth;
    this.currentMonth = month;
  }

  private getCurrentMonth(): Date {
    return this.currentMonth;
  }

}
