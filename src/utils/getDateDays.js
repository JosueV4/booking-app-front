const getDatesDays = (date1, date2) => {
    const miliseconds = new Date(date2) - new Date(date1);
    return miliseconds / (1000 * 60 * 60 * 24);
}

export default getDatesDays;
