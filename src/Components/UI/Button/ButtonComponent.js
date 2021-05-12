import React from "react";
import styles from './ButtonComponent.module.css';

const ButtonComponent = React.forwardRef((props, ref) => (
  <div className={styles.buttonParent}>
    <button className={styles.submitButton} onClick={() => props.clickProp()} ref={ref}>
      Check Availability
    </button>
  </div>
));

export default ButtonComponent;
