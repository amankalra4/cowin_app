import React from 'react';
import DrawerToggle from '../HamBurgerMenu/DrawerToggle';

import styles from './ToolBar.module.css';

const ToolBar = (props) => (
    <div className = {styles.Toolbar}>
        <DrawerToggle clicked = {props.drawerToggleClicked}/>
        <h2 className = {styles.heading}>Don't Hessitate, Vaccinate!</h2>
    </div>
)

export default ToolBar;
