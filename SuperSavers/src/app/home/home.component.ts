import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  categories = [
    'Food',
    'Household',
    'Powders&Plastics',
    'Pet Food',
    'Car Care',
    'Toiletries',
    'Toilet Roll',
    'Cereals'
  ];
}
