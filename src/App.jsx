
import { useEffect } from 'react';
import './App.css'
import { useState } from 'react';

import CandlestickChart from './component/CandlestickChart';

function App() {
  const [ltpData, setLtpData] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState('Nifty');
  const [selectedCandleTime, setSelectedCandleTime] = useState('1min');
  useEffect(() => {
    const socket = new WebSocket(
      "wss://functionup.fintarget.in/ws?id=fintarget-functionup"
    );

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLtpData(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);


  const handleInstrumentChange = (event) => {
    setSelectedInstrument(event.target.value);
  };

  const handleCandleTimeChange = (event) => {
    setSelectedCandleTime(event.target.value);
  };
  return (
    <>
       <div className="min-h-screen bg-gray-100">
       
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">{`${selectedInstrument} LTP: ${ltpData[selectedInstrument] || '-'}`}</div>
            <div>
              <select
                value={selectedInstrument}
                onChange={handleInstrumentChange}
                className="bg-white text-blue-500 px-2 py-1 rounded"
              >
                <option value="Nifty">Nifty</option>
                <option value="Banknifty">BankNifty</option>
                <option value="Finnifty">FinNifty</option>
              </select>
              <select
                value={selectedCandleTime}
                onChange={handleCandleTimeChange}
                className="bg-white text-blue-500 px-2 py-1 rounded ml-2"
              >
                <option value="1min">1 minute</option>
                <option value="3min">3 minutes</option>
                <option value="5min">5 minutes</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <CandlestickChart
          ltpData={ltpData}
          selectedInstrument={selectedInstrument}
          selectedCandleTime={selectedCandleTime}
        />
      </div>
    </div>
    </>
  )
}

export default App
