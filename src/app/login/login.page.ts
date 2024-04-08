import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Define the User interface for storing username and password
interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  // Array to store multiple users
  users: User[] = [
    { username: 'Pranj', password: 'Pranj@1024' },
    { username: 'IAD', password: 'appdeve#123' },
    { username: 'Dylan', password: 'Dylan$789' },
    { username: 'Allan', password: 'Allan123?' },
    { username: 'Common', password: 'Common12345' },
  ];

  // Variables to store input values
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // Function called when the login button is clicked
  login() {
    // Find the user that matches the entered username and password
    const matchedUser = this.users.find(
      (user) => user.username === this.username && user.password === this.password
    );

    if (matchedUser) {
      // Authentication successful, navigate to the specified page
      this.router.navigateByUrl('/tabs/tab1?username=' + matchedUser.username);
    } else {
      // Authentication failed, show an alert
      alert('Invalid username or password. Please try again.');
    }
  }
}
