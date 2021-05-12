import React from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div>
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Welcome!!</p>
      <div className={styles.HomePageContent}>
        <p>
          Here you can search for vaccines that are available in your District
          via <b>Pincode</b> or via <b>District name</b>
        </p>
        <div>
          <ul className={styles.HomePageList}>
            <li>Click on the Menu present at the top left corner.</li>
            <li>
              You can get to know about the sessions by entering your PIN code.
            </li>
            <li>
              You can get to know about the sessions by selecting your District.
            </li>
            <li>
              You can also get the certificate if you have already been
              vaccinated.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
