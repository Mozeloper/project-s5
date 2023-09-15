import { toPascalCase } from "../Helper/toPascalCase";

// All reuseable helper functions helpers here **
export function isArrayEmpty(array) {
  return Array.isArray(array) && array.length > 0;
}

export function isObjectEmpty(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}

export function capitalizeFirstLetter(str) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

export function shortenString(str, maxLength = 20) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + "...";
}

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = String(date.getUTCFullYear()).padStart(4, "0");
  return `${day}/${month}/${year}`;
}

export function checkUppercase(str) {
  for (var i = 0; i < str?.length; i++) {
    if (
      str?.charAt(i) == str?.charAt(i)?.toUpperCase() &&
      str?.charAt(i)?.match(/[a-z]/i)
    ) {
      return true;
    }
  }
  return false;
}

export function containsNumber(str) {
  return /\d/.test(str);
}

export function userFullName() {
  const userObj = JSON.parse(sessionStorage.getItem("userObj"));
  
  // Check if userObj exists and has both FirstName and SurName properties
  if (userObj && userObj.FirstName && userObj.SurName) {
    return `${toPascalCase(userObj.FirstName)} ${toPascalCase(userObj.SurName)}`;
  } else {
    return "User Name Not Found"; // Provide a default value or message
  }
}