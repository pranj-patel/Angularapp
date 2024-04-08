import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking-list',
  template: `
    <h2>Booking List</h2>
    <ul>
      <li *ngFor="let booking of bookings">{{ booking.name }} - {{ booking.date | date }}</li>
    </ul>
  `,
})
export class BookingListComponent implements OnInit {
  bookings!: any[];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookings = this.bookingService.getBookings();
  }
}
