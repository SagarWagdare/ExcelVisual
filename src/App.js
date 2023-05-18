import React from 'react';
import Header from './components/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Barchart from './pages/Chart'
import LineChart from './components/Linechart';
import PieChart from './components/Pichart';
import Bubble from './components/Bubble';
import Donut from './components/Donut';
import AreaChart from './components/AreaChart';
import RadarChart from './components/RadarChart';
import ScatterChart from './components/ScatterChart';

function App() {
  return (

    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Barchart />} />
        <Route path="/lineChart" element={<LineChart />} />
        <Route path="/pieChart" element={<PieChart />} />
        <Route path="/areaChart" element={<AreaChart />} />
        <Route path="/donutChart" element={<Donut />} />
        <Route path="/radarChart" element={<RadarChart />} />

      </Routes>
    </HashRouter >

  );
}

export default App;
