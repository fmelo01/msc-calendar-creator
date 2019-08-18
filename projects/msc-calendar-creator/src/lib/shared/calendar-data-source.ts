import { Observable } from 'rxjs';


export interface CalendarDataSource<DataType> {

  fetchCalendarData(day: Date): Observable<DataType> | DataType | null;

}
