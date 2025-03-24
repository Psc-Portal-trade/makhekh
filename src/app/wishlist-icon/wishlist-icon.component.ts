import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist-icon',
  imports: [CommonModule],
  templateUrl: './wishlist-icon.component.html',
  styleUrl: './wishlist-icon.component.css'
})
export class WishlistIconComponent {

  constructor(public wishlistService: WishlistService) {}

}
