import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  items: any[] = [
    {
      title: 'Item 1',
      description: 'Description for Item 1',
      image: 'assets/Images/5.png',
    },
    {
      title: 'Item 2',
      description: 'Description for Item 2',
      image: 'assets/Images/6.png',
    },
    {
      title: 'Item 3',
      description: 'Description for Item 3',
      image: 'assets/Images/7.png',
    },
    {
      title: 'Item 4',
      description: 'Description for Item 4',
      image: 'assets/Images/8.png',
    },
    {
      title: 'Item 5',
      description: 'Description for Item 5',
      image: 'assets/Images/9.png',
    },
    {
      title: 'Item 6',
      description: 'Description for Item 6',
      image: 'assets/Images/10.png',
    },
  ];

  newItem: any = {
    title: '',
    description: '',
    image: '',
  };

  constructor() {}

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.readFile(file).then((result) => {
        this.newItem.image = result;
      });
    }
  }

  readFile(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  addItem() {
    this.items.push({
      title: this.newItem.title,
      description: this.newItem.description,
      image: this.newItem.image,
    });

    this.newItem = {
      title: '',
      description: '',
      image: '',
    };
  }

  deleteItem(item: any) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  editItem(item: any) {
    item.editing = true;
    item.editTitle = item.title; // Store the current item title for editing
  }
  
  saveItem(item: any) {
    item.title = item.editTitle; // Update the item title with the edited value
    item.editing = false;
  }
}
