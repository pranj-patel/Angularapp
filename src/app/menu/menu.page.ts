import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../booking.service';
// Declare the 'google' variable
declare var google: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  restaurant: any; // Variable to store the restaurant data
  menuItems: any[] = []; // Array to store the menu items
  addedItems: any[] = []; // Array to store the items added to cart
  booking: any = {}; // Object to store booking information

  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit() {
    // Retrieve the restaurant data from the state
    this.restaurant = history.state.restaurant;
    this.menuItems = this.restaurant?.menuItems || [];

    // Initialize the Google Map
    this.initMap();
  }

  // Function called when an item is added to the cart
  addToCart(item: any) {
    const existingItem = this.addedItems.find((addedItem) => addedItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++; // Increase quantity if item already exists in cart
    } else {
      const newItem = { ...item, quantity: 1 }; // Create a copy of the item with quantity 1
      this.addedItems.push(newItem); // Add new item to cart
    }
  }
  
  // Function called when the view cart button is clicked
  viewCart() {
    // Navigate to the cart page and pass the addedItems data as state
    this.router.navigate(['/tabs/tab3'], { state: { addedItems: this.addedItems } });
  }

  // Function to initialize the Google Map
  initMap() {
    const mapElement = document.getElementById('map');
    const map = new google.maps.Map(mapElement, {
      center: { lat: this.restaurant.location.lat, lng: this.restaurant.location.lng },
      zoom: 15
    });

    // Add a marker for the restaurant's location
    new google.maps.Marker({
      position: { lat: this.restaurant.location.lat, lng: this.restaurant.location.lng },
      map: map,
      title: this.restaurant.name
    });
  }

  bookTable() {
    // Check if the booking name, party size, and time are provided
    if (!this.booking.name || !this.booking.partySize || !this.booking.time) {
      console.log('Please provide all the required booking information.');
      return;
    }
  
    // Perform the booking logic
    this.bookingService.bookTable(this.booking)
      .then((bookingSuccessful) => {
        console.log('Booking successful:', bookingSuccessful);
        // Reset the booking form
        this.booking = {};
      })
      .catch((error) => {
        console.log('Error occurred during booking:', error);
      });
  }
}  