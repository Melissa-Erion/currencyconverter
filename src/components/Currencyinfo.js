import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Currencyinfo = ({ baseCurrency, amount }) => {
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?from=${baseCurrency}`
        );
        const data = await response.json();
        setExchangeRates(data.rates || {});
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setExchangeRates({});
      }
    };

    fetchExchangeRates();
  }, [baseCurrency]);

  if (exchangeRates === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>{baseCurrency}</th>
            <th>Other Currencies</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(exchangeRates).map(([currency, rate]) => (
            <tr key={currency}>
              <td>{`${amount} ${baseCurrency}`}</td>
              <td>{`${(amount * rate).toFixed(4)} ${currency}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Currencyinfo.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default Currencyinfo;
