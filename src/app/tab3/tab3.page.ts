import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  addedItems: any[] = []; // Array to store items added to the cart
  total: number = 0; // Total price of items in the cart
  orders: any[] = []; // Array to store past orders
  burgerCount: number = 0; // Total count of burgers in past orders
  saladCount: number = 0; // Total count of salads in past orders
  pizzaCount: number = 0; // Total count of pizzas in past orders

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storage: Storage
  ) {
    this.createDatabase(); // Create the database and load past orders
  }

  async createDatabase() {
    await this.storage.create(); // Create the storage database
    await this.loadPastOrders(); // Load past orders from storage
  }

  async ionViewDidEnter() {
    const state = history.state;
    if (state && state.addedItems) {
      this.addedItems = state.addedItems;
      this.calculateTotal(); // Calculate the total price of items in the cart
    }
  }

  addToCart(item: any) {
    const existingItem = this.addedItems.find((addedItem) => addedItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++; // Increase quantity if item already exists in cart
    } else {
      item.quantity = 1;
      this.addedItems.push(item); // Add new item to cart with quantity 1
    }
    this.calculateTotal(); // Recalculate the total price of items in the cart
    this.updateItemCounts(); // Update the item counts based on the current cart and past orders
  }

  removeItem(item: any) {
    const index = this.addedItems.indexOf(item);
    if (index > -1) {
      this.addedItems.splice(index, 1); // Remove the item from the cart
      this.calculateTotal(); // Recalculate the total price of items in the cart
      this.updateItemCounts(); // Update the item counts based on the current cart and past orders
    }
  }

  calculateTotal() {
    this.total = this.addedItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // Calculate the total price by multiplying item price with quantity and summing them up
  }

  continueShopping() {
    this.router.navigate(['/tabs/tab1']); // Navigate back to the shopping page
  }

  async orderNow() {
    if (this.addedItems.length === 0) {
      const alert = await this.alertController.create({
        header: 'Empty Cart',
        message: 'Sorry, add items to the cart before placing an order.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const order = {
      items: this.addedItems,
      total: this.total,
      timestamp: new Date().getTime()
    };

    // Save the order to storage
    await this.storage.get('pastOrders').then((pastOrders) => {
      const orders = pastOrders || [];
      orders.push(order);
      return this.storage.set('pastOrders', orders);
    });

    const alert = await this.alertController.create({
      header: 'Order Successful',
      message: 'Your order has been placed successfully!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Clear the cart items
            this.addedItems = [];
            this.total = 0;
          }
        }
      ]
    });

    await alert.present();

    await this.loadPastOrders(); // Reload the past orders from storage to update the UI
    }
    
    async loadPastOrders() {
      this.orders = await this.storage.get('pastOrders') || []; // Retrieve the past orders from storage, or an empty array if no orders exist
      this.updateItemCounts(); // Update the item counts based on the current past orders
    }
    
    getLastThreeOrders() {
      return this.orders.slice(-3).reverse(); // Return the last three orders in reverse order
    }
    
    getOrderItemsString(items: any[]) {
      return items.map(item => item.name).join(', '); // Create a string of item names separated by commas
    }
    
    async clearStorage() {
      await this.storage.clear(); // Clear the storage database
      this.orders = []; // Reset the orders array
    }
    
    updateItemCounts() {
      const lastThreeOrders = this.getLastThreeOrders(); // Get the last three orders
      this.burgerCount = this.countItem(lastThreeOrders, 'Burger'); // Count the total number of burgers in the last three orders
      this.saladCount = this.countItem(lastThreeOrders, 'Salad'); // Count the total number of salads in the last three orders
      this.pizzaCount = this.countItem(lastThreeOrders, 'Pizza'); // Count the total number of pizzas in the last three orders
    }
    
    countItem(orders: any[], itemName: string): number {
      let count = 0;
      for (const order of orders) {
        for (const item of order.items) {
          if (item.name === itemName) {
            count += item.quantity; // Increase the count if the item name matches
          }
        }
      }
      return count;
    }
    }
    
