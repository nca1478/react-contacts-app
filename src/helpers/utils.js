// Get value from query URL
export const getValueFromQuery = (str, value) => {
    if (str.match(value)) {
        return str.split(`${value}=`).pop().split('&')[0];
    }
    return null;
};

export const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
};
