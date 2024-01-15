// CurrencyExchange.js
import React, { useState, useEffect } from 'react';
import './App.css';
  
const CurrencyExchange = () => {
    const [exchangeRates, setExchangeRates] = useState([]);

    const fetchExchangeRates = async () => {
      fetch('https://api.currencyfreaks.com/latest?apikey=ee828769239847918e93ad5876aa7593', {
        method: 'GET'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Connection Error')
        }
        return response.json()
      })
      .then(data => {
        setExchangeRates(Object.entries(data.rates))
      })
      .catch(error => {
        console.log(error)
      })
    }

    useEffect(() => {
        fetchExchangeRates();
    }, []);

    const filteredCurrencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP', 'USD'];

    return (
        <>
          <div>
              <h1>Currency Exchange Rates (Based on 1 USD)</h1>
              <table>
              <thead>
                  <tr>
                  <th>Currency</th>              
                  <th>We Buy</th>
                  <th>Exchange Rate</th>
                  <th>We Sell</th>
                  </tr>
              </thead>
              <tbody>
                  {exchangeRates
                  .filter(([currency]) => filteredCurrencies.includes(currency))
                  .map(([currency, rate]) => {
                      const exchangeRate = Number(rate);
                      const weBuy = exchangeRate * (1 + 0.05);
                      const weSell = exchangeRate * (1 - 0.05);
                      
                      return (
                      <tr key={currency}>
                          <td>{currency}</td>
                          <td>{weBuy.toFixed(2)}</td>
                          <td>{exchangeRate.toFixed(2)}</td>
                          <td>{weSell.toFixed(2)}</td>
                      </tr>
                      );
                  })}
              </tbody>
              </table>
          </div>
          <div className='notes'>
            <p>
              Rates are based from 1 USD.<br/>
              This application uses API from https://currencyfreaks.com/
            </p>
          </div>
        </>
    );
};

export default CurrencyExchange;