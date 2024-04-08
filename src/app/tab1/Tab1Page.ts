import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  username!: string; // Variable to store the username
  restaurants = [
    // Array of restaurant objects
    {
      name: 'McDonalds',
      description: 'Griffith University, GC',
      image: 'assets/Images/1.png',
      menu: 'Menu for Restaurant 1',
      location: { lat: -27.552858, lng: 153.051798 },
      menuItems: [
        { name: 'Burger', description: 'Delicious burger', price: 9.99, image: 'assets/Images/6.png' },
        { name: 'Pizza', description: 'Tasty pizza', price: 12.99, image: 'assets/Images/8.png' },
        { name: 'Salad', description: 'Healthy salad', price: 7.99, image: 'assets/Images/12.png' }
      ]
    },
    {
      name: 'KFC',
      description: 'Griffith University, Nathan',
      image: 'assets/Images/2.jpg',
      location: { lat: -27.552858, lng: 153.051798 },
      menu: 'Menu for Restaurant 2',
      menuItems: [
        { name: 'Burger', description: 'Delicious burger', price: 9.99, image: 'assets/Images/6.png' },
        { name: 'Pizza', description: 'Tasty pizza', price: 12.99, image: 'assets/Images/8.png' },
        { name: 'Salad', description: 'Healthy salad', price: 7.99, image: 'assets/Images/12.png' }
      ]
    },
    {
      name: 'Dominos',
      description: 'Griffith University, CBD',
      image: 'assets/Images/3.jpg',
      menu: 'Menu for Restaurant 3',
      location: { lat: -27.552858, lng: 153.051798 },
      menuItems: [
        { name: 'Burger', description: 'Delicious burger', price: 9.99, image: 'assets/Images/6.png' },
        { name: 'Pizza', description: 'Tasty pizza', price: 12.99, image: 'assets/Images/8.png' },
        { name: 'Salad', description: 'Healthy salad', price: 7.99, image: 'assets/Images/12.png' }
      ]
    },
    {
      name: 'Hungry Jacks',
      description: 'Griffith University, Mount Gravatt',
      image: 'assets/Images/4.jpg',
      menu: 'Menu for Restaurant 4',
      location: { lat: -27.552858, lng: 153.051798 },
      menuItems: [
        { name: 'Burger', description: 'Delicious burger', price: 9.99, image: 'assets/Images/6.png' },
        { name: 'Pizza', description: 'Tasty pizza', price: 12.99, image: 'assets/Images/8.png' },
        { name: 'Salad', description: 'Healthy salad', price: 7.99, image: 'assets/Images/12.png' }
      ]
    },
  ];

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private router: Router) {
    // Retrieve the username from query parameters
    this.route.queryParams.subscribe(params => {
      if (params && params['username']) {
        this.username = params['username'];
      }
    });
  }

  // Function to navigate to the menu page and pass the selected restaurant as state
  openMenuPage(restaurant: any) {
    this.navCtrl.navigateForward('/menu', { state: { restaurant } });
  }
}