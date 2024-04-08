import { Component } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  // Properties
  profilePhoto: string = ''; // Holds the profile photo as a base64-encoded string
  username: string = ''; // Holds the username of the user
  email: string = ''; // Holds the email address of the user
  dob: string = ''; // Holds the date of birth of the user
  showProfile: boolean = false; // Determines whether to show the user profile or not

  // Event handler for file input change
  onFileChange(event: any) {
    const file = event.target.files[0]; // Get the selected file from the event
    this.readFile(file); // Read the file contents
  }

  // Read file contents as a base64-encoded string
  readFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.profilePhoto = reader.result as string; // Set the profile photo with the base64-encoded string
    };
    reader.readAsDataURL(file); // Read the file as data URL
  }

  // Save the user profile
  saveProfile() {
    this.showProfile = true; // Set the flag to show the user profile
  }
}
