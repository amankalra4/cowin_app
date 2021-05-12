import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { getDataByPin } from "../Common Data/getAPIData";
import ModalComponent from "./UI/Modal/ModalComponent";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./VaccinationByCalendarAndPin.module.css";
import { convertDate, convertTime } from "../Common Data/DateTimeConverter";
import ButtonComponent from "./UI/Button/ButtonComponent";

const VaccinationByCalendarAndPin = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [pinCode, setPinCode] = useState("");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkError, setError] = useState("");
  const [show, setShow] = useState(false);
  let btnRef = useRef();

  const handlePinCode = (e) => {
    setPinCode(e.target.value);
    setCenters([]);
    setLoading(true);
    btnRef.current.removeAttribute("disabled");
  };

  const handleDateClicked = (dateInp) => {
    setStartDate(dateInp);
    setCenters([]);
    setLoading(true);
    btnRef.current.removeAttribute("disabled");
  };

  const handleClose = () => {
    setShow(false);
    setError("");
    btnRef.current.removeAttribute("disabled");
  };

  const handleClick = () => {
    getDataByPin(pinCode, convertDate(startDate))
      .then((el) => {
        if (el.data.centers.length !== 0) {
          setCenters(el.data.centers);
        } else {
          setShow(true);
        }
        setLoading(false);
        if (btnRef.current) {
          btnRef.current.setAttribute("disabled", "disabled");
        }
      })
      .catch((e) => {
        if (e.response.data.error !== "") {
          setError("Please check the Pincode or Date that you selected.");
        } else {
          setError("There seems to be some error please refresh or retry.");
        }
        setLoading(false);
        setShow(true);
      });
  };

  return (
    <div className="vaccineInfoByPin">
      <div className={styles.calendarAndPinDiv}>
        <label htmlFor="pincodeLabel" className={styles.pinLabel}>
          Enter Pincode:
        </label>
        <input
          type="text"
          id="pincodeLabel"
          placeholder="District Pincode"
          maxLength="6"
          className={styles.pinInput}
          value={pinCode}
          onChange={handlePinCode}
          autoComplete="off"
        />
        <label className={styles.dateLabel}>
          Select Date:{" "}
          <label className="text-muted" style={{ fontSize: "1rem" }}>
            (MM/DD/YYYY)
          </label>
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleDateClicked(date)}
          minDate={new Date()}
          maxDate={new Date().setDate(new Date().getDate() + 30)}
          className={styles.datePicker}
        />
      </div>
      <ButtonComponent clickProp={handleClick} ref={btnRef} />
      <div className={styles.parentContainerDiv}>
        {!loading &&
          centers.length !== 0 &&
          centers.map((el) => (
            <div key={el.center_id} className={styles.vaccineCentersDiv}>
              <p style={{ textAlign: "center" }}>
                <b>
                  <u>Center Name</u>:{" "}
                </b>
                {el.name}, {el.district_name}
              </p>
              <div key={el.center_id} className={styles.centersInfoDiv}>
                {el.sessions.map((el1) => (
                  <div key={el1.session_id} className={styles.infoCard}>
                    <div>
                      <b>
                        Date: <span style={{ color: "blue" }}>{el1.date}</span>
                      </b>
                    </div>
                    <div>
                      <b>
                        Age Limit:{" "}
                        {el1.min_age_limit === 18 ? (
                          <span style={{ color: "red" }}>
                            {el1.min_age_limit}
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            {el1.min_age_limit}
                          </span>
                        )}
                      </b>
                    </div>
                    <div>
                      <b>
                        Avail. Capacity:{" "}
                        {el1.available_capacity <= 10 ? (
                          <span style={{ color: "red" }}>
                            {el1.available_capacity}
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            {el1.available_capacity}
                          </span>
                        )}
                      </b>
                    </div>
                    <div>
                      <b>Cost: </b>
                      {el.fee_type}
                    </div>
                    <div>
                      <b>Time: </b>
                      {convertTime(el.from)} to {convertTime(el.to)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      {!loading && checkError !== "" && (
        <ModalComponent
          title={`Oops, there's a message!`}
          body={checkError}
          show={show}
          handleClose={handleClose}
        />
      )}
      {!loading && checkError === "" && pinCode !== "" && (
        <ModalComponent
          title={`Oops, there's a message!`}
          body={`There are no centers available for the selected Date or Pincode`}
          show={show}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default VaccinationByCalendarAndPin;
