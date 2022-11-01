import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import { getexchange } from '../../redux/exchanges/exchange';
import styles from '../styles/Exchange.module.css';

const Exchange = () => {
  const exchangeData = useSelector((state) => state.exchange);

  const dispatch = useDispatch();

  useEffect(() => {
    if (exchangeData.length === 0) {
      dispatch(getexchange());
    }
  }, [exchangeData.length, dispatch]);

  const formatPrice = (number) => {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(number);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const coinFilter = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <section className={styles.section}>
      <div className={styles.form}>
        <input
          type="text"
          value={searchTerm}
          placeholder="Type to search..."
          onChange={coinFilter}
          className={styles.input}
        />
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-9 text-sm font-semibold tracking-wide text-left">
                Coin
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Symbol
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Price
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Market Cap
              </th>
            </tr>
          </thead>
          {exchangeData[0]
            ?.filter((coin) => {
              if (searchTerm === '') {
                return coin;
              }
              return coin.name.toLowerCase().includes(searchTerm);
            })
            .map((exchange) => (
              <tbody key={exchange.id}>
                <tr className="bg-white">
                  <td className="px-9 py-3 text-sm text-gray-700">
                    <img
                      className="w-25 h-10 object-cover"
                      src={exchange.image}
                      alt={exchange.name}
                    />
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {' '}
                    <h2>{exchange.name}</h2>
                  </td>
                  <td>
                    <span className="px-5 py-1 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-green-200 rounded-md bg-opacity-50">
                      {exchange.symbol}
                    </span>
                  </td>
                  <td>
                    <h4>{formatPrice(exchange.current_price)}</h4>
                  </td>
                  <td>
                    <h4>{formatPrice(exchange.market_cap)}</h4>
                  </td>
                  <td>
                    <Link to={{ pathname: `/coin/${exchange.name}` }}>
                      <BsArrowRightCircle />
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </section>
  );
};

export default Exchange;
