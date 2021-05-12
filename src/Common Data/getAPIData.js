import axios from "axios";

// const API_HEADER = {
//     headers: {
//         Accept: `application/json`,
//         'Accept-Language': 'hi_IN'
//     }
// };

export const getDataByPin = (pincode, date) => {
    return axios.get(process.env.REACT_APP_CALENDAR_BY_PIN.replace('%s1', pincode).replace('%s2', date));
}

export const getStates = () => {
    return axios.get(process.env.REACT_APP_STATES_API);
}

export const getDistricts = (state_id) => {
    return axios.get(process.env.REACT_APP_DISTRICT_CODE_API.replace('%s', state_id));
}

export const getDataByDistrict = (district_id, date) => {
    console.log('mydisttt', district_id);
    console.log('mydistdate', date);
    return axios.get(process.env.REACT_APP_CALENDAR_BY_DISTRICT.replace('%s1', district_id).replace('%s2', date));
}