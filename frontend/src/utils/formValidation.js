export const isEmpty = (value) => {
    return String(value).trim().length === 0 || value === null;
};

export const isEmail = (email) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return String(email).toLowerCase().match(emailRegex);
};

export const isVerifyPassword = (password, verifyPassword) => {
    return String(password) === String(verifyPassword);
};

export const isPhoneNumber = (phoneNumber) => {
    var phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return String(phoneNumber).match(phoneNumberRegex);
};

export const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
};

export const isMinimunBookingDay = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate).getTime();
    const checkOut = new Date(checkOutDate).getTime();
    const differenceDays = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    return differenceDays >= 1;
};

export const isOverOneHundreds = (value) => {
    return Number(value) > 100;
};

export const isValidDiscountDate = (startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const differenceDays = (end - start) / (1000 * 60 * 60 * 24);
    return differenceDays > 0;
};

//check value >= 1000 và là số
export const isNumberAndGreaterThanOrEqual = (value, minValue) => {
    const number = Number(value);
    return !isNaN(number) && number >= minValue;
};
