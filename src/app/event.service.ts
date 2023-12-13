import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventModel} from "./app.component";
import {Injectable} from "@angular/core";
import {DatePipe} from "@angular/common";
import {environment} from "../environments/environment";

@Injectable()
export class EventService {
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) { }

  getEvents(startDate: Date|null = null, endDate: Date|null = null): Observable<EventModel[]> {
    let params = "";
    if(startDate) {
      params += `start_date=${this.datePipe.transform(startDate, 'yyyy-MM-dd')}&`;
    }
    if(endDate) {
      params += `end_date=${this.datePipe.transform(endDate, 'yyyy-MM-dd')}`;
    }
    return this.httpClient.get<EventModel[]>(`${environment.apiUrl}/events?${params}`);
  }
}
