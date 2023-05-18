// import React from "react";

// function PieChart({ chartData }) {
//   return <Pie data={chartData} />;
// }

import { useEffect, useState } from "react";
// import "./Chart.css";
import * as XLSX from "xlsx";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import BarChart from "./Barchart";
import LineChart from "./Linechart";
import PieChart from "./Pichart";
import { UserData } from "./Data/Data";
import { Card, Form } from "react-bootstrap";

const Chart = () => {
  const [data, setData] = useState([]);
  console.log("data", data);
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
      UserData.push(parsedData);
    };
  };

  console.log(
    "label",
    data.map((data) => data.__EMPTY)
  );
  console.log(
    "data",
    data.map((data) => data.__EMPTY_1)
  );
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  useEffect(() => {
    const updatedData = {
      ...userData,
      labels: data.map((data) => data.__EMPTY),
      datasets: [
        {
          ...userData.datasets[0],
          data: data.map((data) => data.__EMPTY_1),
        },
      ],
    };
    setUserData(updatedData);
  }, [data]);
  return (
    <>
      <div className="App">
        <Form.Control
          style={{ marginBottom: "30px", marginTop: "20px" }}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
        <h1>Radar</h1>

        <Card className="shadow">
          <Radar data={userData} style={{ width: "200px", height: "200px" }} />
        </Card>
      </div>
    </>
  );
};

export default Chart;
