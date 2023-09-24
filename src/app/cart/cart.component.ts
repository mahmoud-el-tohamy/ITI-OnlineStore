import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CartService } from '../cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  checkoutForm;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit() {
    this.loadItemsFromLocalStorage(); // Load items from local storage
  }

  loadItemsFromLocalStorage() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    } else {
      this.items = [];
    }
  }

  saveItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  onSubmit(customerData: any) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
    this.saveItemsToLocalStorage(); // Save items to local storage after clearing cart
  }


  removeFromCart(index: number) {
    this.items.splice(index, 1);
    this.saveItemsToLocalStorage(); // Save items to local storage after removing from cart
  }
}
