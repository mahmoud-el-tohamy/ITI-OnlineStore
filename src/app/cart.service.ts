import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }

  addToCart(product: any) {
    let cartItems = this.getItemsFromLocalStorage();
    cartItems.push(product);
    this.saveItemsToLocalStorage(cartItems);
  }

  getItems() {
    return this.getItemsFromLocalStorage();
  }

  clearCart() {
    const cartItems: any[] = [];
    this.saveItemsToLocalStorage(cartItems);
    return cartItems;
  }

  private getItemsFromLocalStorage(): any[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private saveItemsToLocalStorage(items: any[]) {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
}
