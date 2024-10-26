export const isEmpty = (value) => {
    return String(value).length === 0 || value === null;
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

export const isCheckInLessThanCheckOut = (checkInDate, checkOutDate) => {
    return checkInDate >= checkOutDate;
};

// export const isPeopleLargerThanBed = (people, bed) => {
//     return Number(people) > Number(bed);
// };
