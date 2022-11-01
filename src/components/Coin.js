import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';
import './styles/Coin.css';

const Coin = () => {
  const exchangeData = useSelector((state) => state.exchange);
  const { name } = useParams();
  const coinData = exchangeData[0]?.filter((coin) => coin.name === name);

  return (
    <section className="min-h-screen grid place-items-center p-4 bg-gray-900">
      <div>
        {coinData?.map((coin) => (
          <div
            className="relative w-[640px] h-[360px] bg-white overflow-hidden"
            key={coin.id}
          >
            <div
              aria-hidden="true"
              className="absolute w-[512px] h-[512px] bg-slate-100 rounded-full -top-20 -right-56"
            ></div>
            <div className="absolute top-8 right-8">
              <img src={coin.image} alt={coin.name} className='w-44 h-26 object-cover' />
            </div>
            <div
              aria-hidden="true"
              className="absolute -top-16 -left-12 w-[200px] h-[200px] bg-slate-300 rounded-full grid place-items-center"
            >
              <FaCoins className="w-[64px] h-[72px] ml-3 mt-3 icon" />
            </div>
            <div className="relative px-7 mt-64">
              <h2 className="uppercase font-bold text-xl">{coin.name}</h2>
              <p className="uppercase font-bold text-xs text-orange-500 tracking-wide">
               Market Cap $ {coin.market_cap_change_24h.toLocaleString()}
              </p>
              <p className="text-4x1 font-extrabold text-gray-900">
                {coin.last_updated}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Coin;
