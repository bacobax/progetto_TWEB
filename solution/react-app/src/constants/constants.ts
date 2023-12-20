import MessiImage from "../assets/messi.jpg";
import { Player } from "./types";
import DummyProfileImage from "../assets/messi.jpg";

/**
 * GENERIC CONSTANTS AND FUNCTIONS
 */
export const BASE_URL = "http://localhost:8000";
export const WINDOWPHONESIZE = 600;

export const HOME_SECTIONS = {
  HOME: {
    name: "Tome",
    linkLabel: "Home",
  },
  PLAYERS: {
    name: "Tlayers",
    linkLabel: "Players",
  },
  TEAMS: {
    name: "Teams",
    linkLabel: "Teams",
  },
  MATCHES: {
    name: "Matches",
    linkLabel: "Matches",
  },
};

export const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nis";


export const ROUTES = {
  AUTH: '/auth',
  HOME: '/',
  GALLERY: '/gallery',
  CHAT: '/chat',
  DEFAULT: "*",
}

export const sliceArray = <T>(array: T[], size: number): T[][] => {
  if (!Array.isArray(array)) {
    throw new Error("Input 'array' must be an array.");
  }
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error("Input 'size' must be a positive integer.");
  }
  if (array.length === 0 || size <= 0) {
    return [[]];
  }
  const slicedArray: T[][] = [];
  const numChunks = Math.ceil(array.length / size);
  for (let i = 0; i < numChunks; i++) {
    slicedArray.push(array.slice(i * size, (i + 1) * size));
  }
  return slicedArray;
};


export const numberFormatWithCommas = (n: string): string => {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, "ॱ");

}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * FORM STATES
 */
export const playerfilterFormState = {
  name: {
    value: "",
    error: false,
    errorText: "Name must be at least 3 characters long",
    validate: (_: string) => true,
  },
  age: {
    value: "",
    error: false,
    errorText: "Age must be a number",
    validate: (value: string) => !isNaN(Number(value)),
  },
  scoreMin: {
    value: "",
    error: false,
    errorText: "Score must be a number",
    validate: (value: string) => !isNaN(Number(value)),
  },
  scoreMax: {
    value: "",
    error: false,
    errorText: "Score must be a number",
    validate: (value: string) => !isNaN(Number(value)),
  },
};

export const teamfilterFormState = {
  name: {
    value: "",
    error: false,
    errorText: "Name must be at least 3 characters long",
    validate: (_: string) => true,
  },
  competitionName: {
    value: "",
    error: false,
    errorText: "Competition name must be at least 3 characters long",
    validate: (_: string) => true,
  },

};

const passwordRegexValidation = (value: string): boolean => {
  return (
    value.length >= 6 &&
    value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/) !==
      null
  );
};

const dummyPassworValidation = (value: string): boolean => {
  return value.length >= 6;
};
export const initialSignInState = {
  email: {
    value: "",
    error: false,
    errorText: "username must be at least 6 characters long",
    validate: (value: string) => {
      return value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null;
    },
  },
  password: {
    type: "password",
    value: "",
    error: false,
    errorText:
      "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
    validate: dummyPassworValidation,
  },
};
export const initialSignUpState = {
  name: {
    value: "",
    error: false,
    errorText: "username must be at least 6 characters long",
    validate: (value: string) => {
      return value.length >= 0;
    },
  },
  surname: {
    value: "",
    error: false,
    errorText: "username must be at least 6 characters long",
    validate: (value: string) => {
      return value.length >= 0;
    },
  },
  password: {
    value: "",
    type: "password",
    error: false,
    errorText:
      "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
    validate: passwordRegexValidation,
  },
  confirmPassword: {
    value: "",
    type: "password",
    error: false,
    errorText:
      "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
    validate: passwordRegexValidation,
  },
  email: {
    value: "",
    error: false,
    errorText: "email must be valid",
    validate: (value: string) => {
      return value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null;
    },
  },
};
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * DUMMY DATA
 */


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * ANIMATION CONSTANTS
 */
export const animatedButtonProps = {
  animated: true,
  whileHover: {
    scale: 1.1,
  },
  whileTap: {
    scale: 0.9,
  },
};

/**
 * Fetch DATA
 */

export const HOST_MAIN_SERVER = "http://localhost:8080/api";

export const getMainServerPath = (path: string) => {
    return HOST_MAIN_SERVER + path;
}
export const URL_SHORT_PLAYERS = (pageNumber:number,pageSize:number) => getMainServerPath(`/player?limit=${pageSize}&page=${pageNumber}&sort=-market_value_in_eur&fields=first_name,last_name,image_url,market_value_in_eur,highest_market_value_in_eur`);
export const URL_SHORT_TEAMS = (pageNumber:number,pageSize:number)  => getMainServerPath(`/clubs?page=${pageNumber}&pagesize=${pageSize}`);

export const URL_ROOM_FROM_USER = (userId:string) => getMainServerPath(`/room/user/${userId}`);

export const URL_NEW_MESSAGE = (roomId:string) => getMainServerPath(`/room/newMessage/${roomId}`);

export const URL_CREATE_ROOM = getMainServerPath("/room");

export const URL_JOIN_ROOM = (roomId:string) => getMainServerPath(`/room/join/${roomId}`);

export const URL_LEAVE_ROOM = (roomId:string) => getMainServerPath(`/room/leave/${roomId}`);