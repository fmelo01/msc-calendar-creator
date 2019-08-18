import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  Injector,
  SimpleChanges,
  SimpleChange,
  Renderer2
} from '@angular/core';
import { CdkPortalOutlet, ComponentType } from '@angular/cdk/portal';

import { DayComponent } from '../shared/day-component';
import { CalendarDataSource } from '../shared/calendar-data-source';
import { DayData } from '../shared/day-data';
import { CalendarDaysPortalOutlet } from './calendar-days-portal-outlet';

@Component({
  selector: 'msc-calendar-days',
  templateUrl: './calendar-days.component.html',
  styleUrls: ['../shared/calendar-common.css', './calendar-days.component.scss']
})
export class CalendarDaysComponent extends CalendarDaysPortalOutlet implements OnInit {

  @Input() displayMonth: Date;

  @Input() componentType: ComponentType<DayComponent>;

  @Input() calendarDataSource: CalendarDataSource<DayData>;

  @ViewChildren(CdkPortalOutlet)
  dayPortalsOutlets: QueryList<CdkPortalOutlet>;

  constructor(changeDetectionRef: ChangeDetectorRef,
              injector: Injector,
              renderer: Renderer2) {
    super(changeDetectionRef, injector, renderer);
  }

  ngOnInit() {
    super.initPortals(this.displayMonth, this.componentType, this.calendarDataSource);
  }

  ngOnChanges(changes: SimpleChanges) {
    const monthChange = changes.displayMonth as SimpleChange;
    if (monthChange && !monthChange.isFirstChange()) {
      super.updateCalendarDays(monthChange.currentValue);
    }
  }

}
