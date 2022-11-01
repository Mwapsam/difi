import Exchange from './components/exchanges/Exchange';
// import Converter from './components/Converter';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Coin from './components/Coin';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Exchange />} />
        <Route path="/coin/:name" element={<Coin />} />
        {/* <Route path="/converter" element={<Converter />} /> */}
      </Routes>
    </>
  );
}

export default App;
