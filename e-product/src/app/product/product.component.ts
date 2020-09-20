import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExchangeRateService } from '../header/exchange.service';
import { Product } from './product.model';
import { products } from './products'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  currencyCode : string = 'INR';
  currencyRate : number = 1;
  subscription: Subscription;
  constructor(private exchangeService: ExchangeRateService) { }

  products: Product[];
  ngOnInit() {
    this.products = products.map(item => {
      return new Product(item.ProductID, item.Name, item.Price, item.ImagePath);
    }).slice(0,3);
    this.subscription = this.exchangeService.currentRate.subscribe(selectedCurrency => {
      this.currencyRate = selectedCurrency.exchangeRate;
      this.currencyCode = selectedCurrency.currency;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
