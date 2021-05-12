export function convertDate(inp) {
    let date = new Date(inp);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return [day, month, date.getFullYear()].join("-");
}

export function convertTime(inp) {
    let time = +(inp.slice(0, 2));
    let hour = time % 12 || 12;
    if(time < 12) {
        return hour.toString() + 'am'
    }
    else {
        return hour.toString() + 'pm'
    }
}