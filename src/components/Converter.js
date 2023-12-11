import React, { useState, useEffect } from "react";
import Currencyinfo from "./Currencyinfo";

const Converter = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("CAD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState({});

  const handleSwapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?from=${baseCurrency}`
        );
        const data = await response.json();
        setExchangeRate(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRate();
  }, [baseCurrency]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://api.frankfurter.app/currencies");
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="converter-container">
      <label className="input-label">
        $
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <label className="input-label">
        From:
        <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
          {Object.keys(currencies).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>
      <button className="swap-button" onClick={handleSwapCurrencies}>
        Swap Currencies
      </button>
      <label className="input-label">
        To:
        <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
          {Object.keys(currencies).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>
      <p className="result">
        {amount} {baseCurrency} is equal to{" "}
        {exchangeRate
          ? (amount * exchangeRate[targetCurrency]).toFixed(2)
          : "Loading..."}{" "}
        {targetCurrency}
      </p>

      <Currencyinfo baseCurrency={baseCurrency} amount={amount} />
    </div>
  );
};

export default Converter;
