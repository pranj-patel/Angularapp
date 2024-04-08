import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  getBookings(): any[] {
    throw new Error('Method not implemented.');
  }
  private bookings: any[] = []; // Store bookings in memory

  constructor() {
    // Initialize bookings from storage upon service initialization
    this.loadBookingsFromStorage();
  }

  bookTable(bookingInfo: any): Promise<boolean> {
    // Perform the booking operation here
    // You can use an HTTP request to a backend API or perform any other necessary logic
    // Return a promise that resolves to a boolean indicating the success of the booking
    return new Promise((resolve) => {
      // Simulating a booking by resolving the promise after a short delay
      setTimeout(() => {
        const bookingSuccessful = true; // Replace with actual booking logic

        // Add the booking to the in-memory array
        this.bookings.push(bookingInfo);

        // Save the bookings array to storage
        this.saveBookingsToStorage();

        resolve(bookingSuccessful);
      }, 2000);
    });
  }

  private loadBookingsFromStorage(): void {
    // Load bookings from storage (e.g., localStorage) and update the in-memory array
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      this.bookings = JSON.parse(savedBookings);
    }
  }

  private saveBookingsToStorage(): void {
    // Save the bookings array to storage (e.g., localStorage)
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }
}
