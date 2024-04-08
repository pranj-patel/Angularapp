import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartOptions, ChartData, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef; // Reference to the chart canvas element
  chart!: Chart; // Chart object
  chartData: ChartData = {
    // Initial chart data
    labels: ['Burger', 'Pizza', 'Salad'],
    datasets: [
      {
        label: 'Food Items',
        data: [0, 0, 0],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };
  chartOptions: ChartOptions = {
    // Chart options
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
// Array of restaurant objects
// Each object contains name, description, image, menu, and menuItems properties
  restaurants: { name: string; description: string; image: string; menu: string; menuItems: any[] }[] = [
    {
      
      name: 'McDonalds',
      description: 'Griffith University, GC',
      image: 'assets/Images/1.png',
      menu: 'Menu for Restaurant 1',
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
      menuItems: [
        { name: 'Burger', description: 'Delicious burger', price: 9.99, image: 'assets/Images/6.png' },
        { name: 'Pizza', description: 'Tasty pizza', price: 12.99, image: 'assets/Images/8.png' },
        { name: 'Salad', description: 'Healthy salad', price: 7.99, image: 'assets/Images/12.png' }
      ]
    },
  ];

  filteredRestaurants: { name: string; description: string; image: string; menu: string; menuItems: any[] }[] = [];
  searchText: string = '';

  burgerQuantity: number = 0; // Quantity of burgers
  pizzaQuantity: number = 0; // Quantity of pizzas
  saladQuantity: number = 0; // Quantity of salads

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.createChart(); // Create the chart after the view has been initialized
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar', // Bar chart type
      data: this.chartData, // Chart data
      options: this.chartOptions, // Chart options
    });
  }

  search() {
    if (this.searchText.length > 0) {
      // Filter restaurants based on the search text
      this.filteredRestaurants = this.restaurants.filter(
        (restaurant) => restaurant.name.toLowerCase().startsWith(this.searchText.toLowerCase())
      );
    } else {
      this.filteredRestaurants = [];
    }
  }

  goToRestaurant(restaurant: any) {
    this.router.navigate(['/tabs/tab1'], { state: { restaurant: restaurant } }); // Navigate to the restaurant page with the selected restaurant as state
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search(); // Perform search when Enter key is pressed
    }
  }

  updateChartData() {
    const data = [this.burgerQuantity, this.pizzaQuantity, this.saladQuantity];
    if (this.chart) {
      // Update the chart data and redraw
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    }
  }
}







