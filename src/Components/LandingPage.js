import React, { useState } from 'react';
import VaccinationByCalendarAndPin from './VaccinationByCalendarAndPin';
import HomePage from './HomePage';
import VaccinationByCalendarAndDistrict from './VaccinationByCalendarAndDistrict';
import SideDrawer from './HamBurgerMenu/SideDrawer';
import ToolBar from './ToolBar/ToolBar';
import GetCertificate from './GetCertificate';
import { Route, Switch } from 'react-router';

import styles from './LandingPage.module.css';

function LandingPage() {
  const [showSideDrawer, toggleSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    toggleSideDrawer(true);
  }

  const sideDrawerClosedHandler = () => {
    toggleSideDrawer(!showSideDrawer);
  }
  return (
    <React.Fragment>
      <ToolBar drawerToggleClicked = {sideDrawerToggleHandler}/>
      <SideDrawer open = {showSideDrawer} closed = {sideDrawerClosedHandler}/>
      <div className = {styles.mainContent}>
        <Switch>
          <Route path = '/' exact component = {HomePage} />
          <Route path = '/vaccineDetailsByPin' component = {VaccinationByCalendarAndPin} />
          <Route path = '/vaccineDetailsByDistrict' component = {VaccinationByCalendarAndDistrict} />
          <Route path = '/getCertificate' component = {GetCertificate} />
        </Switch>
      </div>
      <div className={styles.Footer}>
        <p>Data shown above is derived from Cowin's API.</p>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
