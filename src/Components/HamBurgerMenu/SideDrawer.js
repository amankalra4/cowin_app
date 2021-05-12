import React from 'react';
import NavigationItems from '../HamBurgerMenu/Navigation/NavigationItems';
import styles from './SideDrawer.module.css';
import BackDrop from '../UI/BackDrop/BackDrop';

const SideDrawer = (props) => {
    let attachedClassStyles  = [styles.SideDrawer, styles.Close];
    if(props.open) {
        attachedClassStyles = [styles.SideDrawer, styles.Open]
    }
    return (
        <React.Fragment>
            {props.open && <BackDrop toggleBackDrop = {props.closed} />}
            <div className = {attachedClassStyles.join(' ')}>
                <NavigationItems toggleBackDrop = {props.closed} />
            </div>
        </React.Fragment>
    );
}

export default SideDrawer;
