import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-icon',
  imports: [CommonModule],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.css'
})
export class CartIconComponent {

  constructor(public cartService: CartService) {}

}
