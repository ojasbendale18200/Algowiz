// CandlestickChart.js
import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const CandlestickChart = ({ ltpData, selectedInstrument, selectedCandleTime }) => {
    const [series, setSeries] = useState([]);

    const DataGeneration = () => {
        const data = [];
        const volumeData = [];

        const interval = getCandlestickInterval(selectedCandleTime);
      
        for (let i = 0; i < 50; i++) {
          const time = new Date().getTime() + i * interval;
          const open = Math.random() * 10 + ltpData[selectedInstrument];
          const close = Math.random() * 10 + ltpData[selectedInstrument];
          const low = Math.random() * 10 + ltpData[selectedInstrument];
          const high = Math.random() * 10 + ltpData[selectedInstrument];
          const volume = Math.random() * 1000;
      
          data.push({
            x: time,
            y: [open, close, low, high],
          });
      
          volumeData.push({
            x: time,
            y: volume,
          });
        }
      
        return { data, volumeData };
      };

      const getCandlestickInterval = (selectedCandleTime) => {
        switch (selectedCandleTime) {
          case '1min':
            return 60000; 
          case '3min':
            return 180000; 
          case '5min':
            return 300000; 
          default:
            return 60000; 
        }
      };

  const chartOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
      background: '#f9f9f9',
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left',
      style: {
        fontSize: '16px',
        color: '#333',
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#666',
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: '#666',
        },
      },
    },
    grid: {
      borderColor: '#ddd',
      row: {
        colors: ['#f3f3f3', 'transparent'],
      },
    },
  };

  const calculateMovingAverage = (data, period) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const average = data
        .slice(Math.max(0, i - period + 1), i + 1)
        .reduce((sum, candle) => sum + candle.y[3], 0) / period;
      result.push({ x: data[i].x, y: average });
    }
    return result;
  };
  
  
  
  const movingAverageData = calculateMovingAverage(DataGeneration().data, 10);
  

  useEffect(() => {
    setSeries([
        {
          data: DataGeneration().data,
        },
        {
          name: 'Volume',
          data: DataGeneration().volumeData,
        },
        {
          name: 'MA(10)',
          data: movingAverageData,
        },
      ]);
  }, [ltpData, selectedInstrument]);
  

  return (
    <div className="mt-4">
    <ApexCharts options={chartOptions} series={series} type="candlestick" height={350} />
    
    </div>
  );
};

export default CandlestickChart;
