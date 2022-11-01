import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AiTwotoneHome } from 'react-icons/ai';
import { BsCurrencyExchange } from 'react-icons/bs';
import { FcAbout } from 'react-icons/fc';
import Converter from './Converter';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [choice, setCoice] = useState(false);

  const handleClick = () => {
    setActive(true);
  };

  const handleClose = () => {
    setActive(false);
  };

  return (
    <nav className="flex justify-center w-full">
      <div className="flex bg-green-50 m-5 p-0 rounded-lg shadow-orange-400">
        <Link
          to="/"
          className="px-10 flex cursor-pointer justify-center p-4 m-3 text-2xl"
        >
          <AiTwotoneHome />
        </Link>
        <div
          className="px-10 flex cursor-pointer justify-center p-4 m-3 text-2xl"
          onClick={handleClick}
          choice='false'
        >
          <BsCurrencyExchange />
        </div>
        <Link
          to="/"
          className="px-10 flex cursor-pointer justify-center p-4 m-3 text-2xl"
        >
          <FcAbout />
        </Link>
      </div>

      <Outlet />
      {active && <Converter setActive={setActive} setCoice={setCoice} />}
    </nav>
  );
};

export default Navbar;
