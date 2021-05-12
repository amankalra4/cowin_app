import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import {
  getStates,
  getDistricts,
  getDataByDistrict,
} from "../Common Data/getAPIData";
import DropdownButton from "react-bootstrap/DropdownButton";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./VaccinationByCalendarAndDistrict.module.css";
import { Dropdown } from "react-bootstrap";
import { convertDate, convertTime } from "../Common Data/DateTimeConverter";
import ModalComponent from "./UI/Modal/ModalComponent";
import ButtonComponent from "./UI/Button/ButtonComponent";

const VaccinationByCalendarAndDistrict = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("States");
  const [selectedDistrict, setSelectedDistrict] = useState("Districts");
  const [selectedDistrictID, setSelectedDistrictID] = useState("");
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [checkError, setError] = useState("");
  let btnRef = useRef();

  useEffect(() => {
    getStates()
      .then((el) => {
        if (el.data.states.length !== 0) {
          setStates(el.data.states);
        } else {
          setShow(true);
        }
        setLoading(false);
      })
      .catch((e) =>
        console.error(
          `Below error was encountered: \n: ${e.response.data.error}`
        )
      );
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
  }, []);

  const handleStateDropDownClick = (state_name, state_id) => {
    setSelectedState(state_name);
    setSelectedDistrict("Districts");
    getDistrictsList(state_id);
  };

  function getDistrictsList(id) {
    getDistricts(id)
      .then((el) => {
        if (el.data.districts.length !== 0) {
          setDistricts(el.data.districts);
        } else {
          setShow(true);
        }
        setLoading(false);
      })
      .catch((e) =>
        console.error(
          `Below error was encountered: \n: ${e.response.data.error}`
        )
      );
  }

  const handleDistrictDropDownClick = (district_name, district_id) => {
    setSelectedDistrict(district_name);
    setSelectedDistrictID(district_id);
    btnRef.current.removeAttribute("disabled");
  };

  const handleDateClicked = (dateInp) => {
    setStartDate(dateInp);
    setLoading(true);
    setDistrictData([]);
    btnRef.current.removeAttribute("disabled");
  };

  const handleClose = () => {
    setShow(false);
    setError("");
    btnRef.current.removeAttribute("disabled");
  };

  const handleClick = () => {
    getDataByDistrict(selectedDistrictID, convertDate(startDate))
      .then((el) => {
        if (el.data.centers.length !== 0) {
          setDistrictData(el.data.centers);
        } else {
          setShow(true);
        }
        setLoading(false);
        if (btnRef.current) {
          btnRef.current.setAttribute("disabled", "disabled");
        }
      })
      .catch((e) => {
        if (e.response.data) {
          setError("There seems to be an error. Please reload the page");
        }
        setLoading(false);
        setShow(true);
      });
  };

  return (
    <div className="vaccineInfoByDistrict">
      <div className={styles.calendarAndDistrictDiv}>
        <label className={styles.stateLabel}>State: </label>
        <DropdownButton id="dropdown-basic-button" title={selectedState}>
          <div style={{ overflow: "auto", height: "50vh" }}>
            {!loading &&
              states.length !== 0 &&
              states.map((el) => (
                <Dropdown.Item
                  key={el.state_id}
                  onClick={() =>
                    handleStateDropDownClick(el.state_name, el.state_id)
                  }
                >
                  {el.state_name}
                </Dropdown.Item>
              ))}
          </div>
        </DropdownButton>
        {districts.length !== 0 && (
          <React.Fragment>
            <label className={styles.districtLabel}>District: </label>
            <DropdownButton id="dropdown-basic-button" title={selectedDistrict}>
              <div style={{ overflow: "auto", height: "50vh" }}>
                {districts.map((el) => (
                  <Dropdown.Item
                    key={el.district_id}
                    onClick={() =>
                      handleDistrictDropDownClick(
                        el.district_name,
                        el.district_id
                      )
                    }
                  >
                    {el.district_name}
                  </Dropdown.Item>
                ))}
              </div>
            </DropdownButton>
          </React.Fragment>
        )}
        <label className={styles.dateLabel}>Date: </label>
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
          districtData.length !== 0 &&
          districtData.map((el) => (
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
      {!loading && districtData.length === 0 && (
        <ModalComponent
          title={`Oops, there's a message!`}
          body={`There are no centers available for the selected Date.`}
          show={show}
          handleClose={handleClose}
        />
      )}
      {!loading && checkError !== "" && (
        <ModalComponent
          title={`Oops, there's a message!`}
          body={checkError}
          show={show}
          handleClose={handleClose}
        />
      )}
      {}
    </div>
  );
};

export default VaccinationByCalendarAndDistrict;
