import { CalendarDataSource } from '../shared/calendar-data-source';
import { ComponentPortal, ComponentType, PortalInjector} from '@angular/cdk/portal';
import { DayComponent } from '../shared/day-component';
import { DayData } from '../shared/day-data';
import { CALENDAR_DAY } from '../shared/token';

export class ComponentDayFactory {

  constructor(private injector,
              private componentType: ComponentType<DayComponent>,
              private calendarDataSource: CalendarDataSource<DayData>) { }

  createDayComponent(day: Date): ComponentPortal<DayComponent> {
    const injector = this.createInjector(day);
    const portal = new ComponentPortal(this.componentType, null, injector);
    return portal;
  }

  createInjector(day: Date): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(CALENDAR_DAY, day);
    return new PortalInjector(this.injector, injectorTokens);
  }

}
