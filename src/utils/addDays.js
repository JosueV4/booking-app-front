const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
}

export default addDays;
