import React from "react";
// import {AiFillHome } from 'react-icons/ai';
// import {GiNetworkBars } from 'react-icons/gi';
import "./Header.css";
import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">ExcelVisual</Navbar.Brand>
        <Nav className="mx-auto">
          <NavLink to="/" className="mx-3" style={{ textDecoration: "none" }}>
            <Button>BarChart</Button>
          </NavLink>
          <NavLink
            to="/lineChart"
            className="mx-3"
            style={{ textDecoration: "none" }}
          >
            <Button>LineChart</Button>
          </NavLink>
          <NavLink
            to="/pieChart"
            className="mx-3"
            style={{ textDecoration: "none" }}
          >
            <Button>PieChart</Button>
          </NavLink>
          <NavLink
            to="/areaChart"
            className="mx-3"
            style={{ textDecoration: "none" }}
          >
            <Button>AreaChart</Button>
          </NavLink>
          <NavLink
            to="/dountChart"
            className="mx-3"
            style={{ textDecoration: "none" }}
          >
            <Button>DonutChart</Button>
          </NavLink>
          <NavLink
            to="/radarChart"
            className="mx-2"
            style={{ textDecoration: "none" }}
          >
            <Button>RadarChart</Button>
          </NavLink>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
