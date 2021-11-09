// Get value from query URL
export const getValueFromQuery = (str, value) => {
    if (str.match(value)) {
        return str.split(`${value}=`).pop().split('&')[0];
    }
    return null;
};
