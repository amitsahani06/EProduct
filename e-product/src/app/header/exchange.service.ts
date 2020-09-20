import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
    public currentRate = new BehaviorSubject<{ currency: string, exchangeRate: number }>({ currency: 'INR', exchangeRate: 1 });

    constructor(private httpClient: HttpClient) { }

    getExchangeRates() {
        return this.httpClient.get('https://api.exchangeratesapi.io/latest?base=INR');
    }

    currencyChange(selectedCurrency: { currency: string, exchangeRate: number }) {
        console.log('in service', selectedCurrency);
        this.currentRate.next(selectedCurrency);
    }

}