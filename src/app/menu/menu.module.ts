import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Add this line

import { MenuPage } from './menu.page';
import { MenuRoutingModule } from './menu-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, // Add this line
    MenuRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
