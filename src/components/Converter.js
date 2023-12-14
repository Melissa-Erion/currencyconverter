import React, { useState, useEffect, useRef } from "react";
import Currencyinfo from "./Currencyinfo";
import Chart from 'chart.js/auto';



const Converter = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("CAD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState({});
  const chartRef = useRef(null);

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

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      try {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        const response = await fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${baseCurrency}&to=${targetCurrency}`);
        const data = await response.json();

        if (!data.error) {
          const chartLabels = Object.keys(data.rates);
          const chartData = Object.values(data.rates).map(rate => rate[targetCurrency]);
          const chartLabel = `${baseCurrency}/${targetCurrency}`;

          buildChart(chartLabels, chartData, chartLabel);
        } else {
          console.error("Error fetching historical rates:", data.error);
        }
      } catch (error) {
        console.error("Error fetching historical rates:", error);
      }
    };

    fetchHistoricalRates();
  }, [baseCurrency, targetCurrency]);

  const buildChart = (labels, data, label) => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx.chart) {
        ctx.chart.destroy(); // Destroy the existing chart instance
      }
      ctx.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label,
            data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: 'white', // Set the legend label color
              },
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?from=${baseCurrency}`
        );
        const data = await response.json();
        setExchangeRate(data.rates);
        buildChart(
          Object.keys(data.rates),
          Object.values(data.rates).map((rate) => rate[targetCurrency]),
          `${baseCurrency}/${targetCurrency}`
        );
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRate();
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      try {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        const response = await fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${baseCurrency}&to=${targetCurrency}`);
        const data = await response.json();
  
        if (!data.error) {
          const chartLabels = Object.keys(data.rates);
          const chartData = Object.values(data.rates).map(rate => rate[targetCurrency] * amount); // Multiply by the amount
          const chartLabel = `${baseCurrency}/${targetCurrency}`;
  
          buildChart(chartLabels, chartData, chartLabel);
        } else {
          console.error("Error fetching historical rates:", data.error);
        }
      } catch (error) {
        console.error("Error fetching historical rates:", error);
      }
    };
  
    fetchHistoricalRates();
  }, [baseCurrency, targetCurrency, amount]);

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
        {amount} {baseCurrency} is equal to{' '}
        {exchangeRate
          ? (amount * exchangeRate[targetCurrency]).toFixed(2)
          : 'Loading...'}{' '}
        {targetCurrency}
      </p>
      <canvas ref={chartRef} /> {/* Chart canvas */}
      <Currencyinfo baseCurrency={baseCurrency} amount={amount} />
    </div>
  );
};

export default Converter;
