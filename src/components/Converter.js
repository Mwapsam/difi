import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import Axios from 'axios';
import 'react-dropdown/style.css';
import './styles/Converter.css';

const Converter = () => {
  // Initializing all the state variables
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('');
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);



  // Calling the api whenever the dependency changes
  useEffect(() => {
    let isMounted = true;
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      if (isMounted) {
        setInfo(res.data[from]);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [from]);

  // Calling the api whenever the dependency changes

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  // Converting the currency
  function convert() {
    if (to === '') {
      setOutput(0);
    } else {
      let rate = info[to.toLowerCase()];
      setOutput(input * rate);
    }
  }

  const opt = options.map((option) => {
    return option.toUpperCase();
  });


  // if(modal) {
  //   document.body.classList.add('active-modal')
  // } else {
  //   document.body.classList.remove('active-modal')
  // }

  return (
    <div className="bg-zinc-200 opacity-95 fixed inset-o z-50 w-full">
      <div className="flex flex-col h-screen justify-center items-center gap-6">
        <div className="flex-col justify-center bg-white py-8 px-20 border-4 border-sky-500 rounded-xl">
          <div className="heading">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl py-8">
              <span className="block text-indigo-600">Currency converter</span>
            </h1>
          </div>
          <div className="flex gap-7">
            <div className="left text-lg text-zinc-900">
              <input
                type="text"
                placeholder="Enter the amount"
                onChange={(e) => setInput(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="middle">
              <Dropdown
                options={opt}
                onChange={(e) => {
                  setFrom(e.value);
                }}
                value={from.toUpperCase()}
                placeholder="From"
                arrowOpen={<span className="arrow-open" />}
              />
            </div>

            <div className="right">
              <Dropdown
                options={opt}
                onChange={(e) => {
                  setTo(e.value);
                }}
                value={to}
                placeholder="To"
              />
            </div>
          </div>
          <div className="py-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={() => {
                convert();
              }}
            >
              Convert
            </button>
            <p className="py-8 text-green-600 font-extrabold">
              {input +
                ' ' +
                from.toUpperCase() +
                ' = ' +
                output.toFixed(2) +
                ' ' +
                to.toUpperCase()}
            </p>
          </div>
          <div className="float-right">
            <button className="close-modal shadow appearance-none border rounded w-full leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
