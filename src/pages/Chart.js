import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import BarChart from "../components/Barchart";
import { UserData } from "../components/Data/Data";
import { Card, Form } from "react-bootstrap";

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
  }

  // take color from to color plate
  const [backgroundColor, setBackgroundColor] = useState('');
  const handleChangeBackgroundColor = (e) => {
    setBackgroundColor(e.target.value);
  };
  // take index 
  const [bcolor, setBcolor] = useState('');

  // graph funtionality

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained",
        data: [],
        fill: true,
        backgroundColor: ["rgba(15,58,176, 0.5)", "rgba(12,44,474, 0.5)", "rgba(28,114,199, 0.5)", "rgba(165,17,7, 0.5)", "rgba(156,25,36, 0.5)",
          "rgba(99,38,163, 0.5)",
          "rgba(8,658,29, 0.5)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const color = ['blue', 'green', 'red']
  // add  changes colors in array
  const [colors, setColors] = useState(color);
  useEffect(() => {
    const updatedColors = [...userData.datasets[0].backgroundColor];
    updatedColors[bcolor] = backgroundColor;
    setColors(updatedColors);
    setBackgroundColor('')
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
          backgroundColor: colors,
        },
      ],
    };
    setUserData(updatedData);

  }, [data, backgroundColor]);


  //  return
  return (
    <>

      <div className="App">
        {/* for xlsx file */}

        <Form.Control style={{ marginBottom: "30px", marginTop: "20px" }}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload} />

        <h1>BarChart</h1>



        <Form.Control style={{ marginBottom: "30px", width: "200px" }}
          type="number"
          className=" mx-auto"

          onChange={(e) => { setBcolor(e.target.value) }} />
        <Form.Control
          type="color"
          className="d-flex mx-auto"
          value={backgroundColor}
          onChange={handleChangeBackgroundColor}
        />

        <Card className="shadow" >
          <BarChart chartData={userData} />
        </Card>

      </div>
    </>
  )
}

export default Chart;