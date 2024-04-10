const generateFlag = countryId => {
    return `https://flagcdn.com/${countryId.toLowerCase()}.svg`;
}

export default generateFlag;