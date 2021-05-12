import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavigationItems.module.css";

const NavigationItems = (props) => {
  return (
    <ol className = {styles.NavigationItems}>
      <li>
        <NavLink activeClassName = {styles.active} exact to="/" onClick = {() => props.toggleBackDrop()}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName = {styles.active} to="/vaccineDetailsByPin" onClick = {() => props.toggleBackDrop()}>
          Get Vaccination Sessions by PIN
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName = {styles.active} to="/vaccineDetailsByDistrict" onClick = {() => props.toggleBackDrop()}>
          Get Vaccination Sessions by District
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName = {styles.active} to="/getCertificate" onClick = {() => props.toggleBackDrop()}>
            Get Your Certificate
        </NavLink>
      </li>
    </ol>
  );
};

export default NavigationItems;
