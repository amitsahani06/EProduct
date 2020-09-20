import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExchangeRateService } from './exchange.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  exchangeRates: any;
  currencyRate: any;
  subscription: Subscription;
  constructor(private exchangeService: ExchangeRateService) { }

  ngOnInit(): void {
    this.subscription = this.exchangeService.getExchangeRates().subscribe(data => {
      this.exchangeRates = JSON.parse(JSON.stringify(data["rates"]));
    });
  }

  fetchRate(event) {
    let selectedCurrency: string = JSON.parse(JSON.stringify(event.target.id).toUpperCase());
    this.currencyRate = this.exchangeRates[selectedCurrency];
    this.exchangeService.currencyChange({ currency: selectedCurrency, exchangeRate: this.currencyRate });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
