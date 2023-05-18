import React from "react";

import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import * as XLSX from "xlsx";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import BarChart from "./Barchart";
import LineChart from "./Linechart";
import PieChart from "./Pichart";
import { UserData } from "./Data/Data";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
const Chart = () => {
  // For  Reading Xlsx file
  const [data, setData] = useState([]);

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
  // random color generater
  const [coloradd, setColoradd] = useState([]);
  const dynamicColors = () => {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.5)";
  };

  function poolColors(a) {
    var pool = [];
    for (var i = 0; i < a; i++) {
      pool.push(dynamicColors());
    }
    console.log("kkkkk", pool);
    return pool;
  }
  // take color from to color plate
  const [backgroundColor, setBackgroundColor] = useState("");
  const handleChangeBackgroundColor = (e) => {
    setBackgroundColor(e.target.value);
  };
  // take index
  const [bcolor, setBcolor] = useState("");

  // graph funtionality
  const color = coloradd;
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained",
        data: [],
        fill: true,
        backgroundColor: [
          "rgba(15,58,176, 0.5)",
          "rgba(12,4,174, 0.5)",
          "rgba(18,114,199, 0.5)",
          "rgba(65,177,57, 0.5)",
          "rgba(76,25,36, 0.5)",
          "rgba(99,38,163, 0.5)",
          "rgba(8,68,29, 0.5)",
        ],
        pointColor: [
          "rgba(75,58,176, 0.5)",
          "rgba(12,4,174, 0.5)",
          "rgba(18,114,199, 0.5)",
          "rgba(65,177,57, 0.5)",
          "rgba(73,25,36, 0.5)",
          "rgba(99,38,163, 0.5)",
          "rgba(36,48,29, 0.5)",
        ],
        fillColor: ["blue"],
        pointStrokeColor: [
          "rgba(75,58,176, 0.5)",
          "rgba(12,4,174, 0.5)",
          "rgba(18,114,199, 0.5)",
          "rgba(15,177,57, 0.5)",
          "rgba(146,25,36, 0.5)",
          "rgba(99,28,163, 0.5)",
          "rgba(86,58,29, 0.5)",
        ],
        borderColor: "black",
        borderWidth: 2,
        pointRadius: 10,
      },
    ],
  });

  // store changes colors in array
  const [colors, setColors] = useState(coloradd);
  useEffect(() => {
    const updatedColors = [...userData.datasets[0].backgroundColor];
    updatedColors[bcolor] = backgroundColor;
    setColors(updatedColors);
    setBackgroundColor("");
  }, [backgroundColor, bcolor]);

  // graph funtionality on changes
  useEffect(() => {
    const updatedData = {
      ...userData,
      labels: data.map((data) => data.__EMPTY),
      datasets: [
        {
          ...userData.datasets[0],
          data: data.map((data) => data.__EMPTY_1),
          borderColor: colors,
          pointStrokeColor: colors,
        },
      ],
    };
    setUserData(updatedData);
  }, [data, backgroundColor]);

  return (
    <>
      <div className="App">
        <Form.Control
          style={{ marginBottom: "30px", marginTop: "20px" }}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />

        <h1>LineChart</h1>

        <Form.Control
          style={{ marginBottom: "30px", width: "200px" }}
          className="d-flex mx-auto"
          type="number"
          onChange={(e) => {
            setBcolor(e.target.value);
          }}
        />

        <Form.Control
          className="mx-auto"
          type="color"
          value={backgroundColor}
          onChange={handleChangeBackgroundColor}
        />
        <Card className="shadow">
          <Line data={userData} style={{ width: "200px", height: "200px" }} />
        </Card>
      </div>
    </>
  );
};

export default Chart;
