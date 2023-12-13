import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {EventService} from "./event.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

export interface EventModel {
  title: string,
  description: string,
  time: string,
  location: string,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatNativeDateModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [EventService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private eventService: EventService) {
  }

  title = 'events-frontend';
  displayedColumns: string[] = ['title', 'description', 'time', 'location'];
  events: EventModel[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  isLoading: boolean = true;

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.isLoading = false;
    })
  }

  onDateChange() {
    this.isLoading = true;
    this.eventService
      .getEvents(this.range.value.start, this.range.value.end)
      .subscribe(data => {
        this.events = data;
        this.isLoading = false;
      })
  }
}
