import MessiImage from "../assets/messi.jpg";
import {Player, PlayerSearchFilters} from "./types";
import DummyProfileImage from "../assets/messi.jpg";
import {QueryFilters} from "../pages/games/Games";

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
  TEAMS: {
    name: "Teams",
    linkLabel: "Teams",
  },
  MATCHES: {
    name: "Matches",
    linkLabel: "Matches",
  },
  GAMES: {
    name: "Games",
    linkLabel: "/games",
  },
  PLAYERS: {
    name: "Players",
    linkLabel: "/players",
  }

};

export const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nis";


export const ROUTES = {
  AUTH: '/auth',
  HOME: '/',
  CLUBS: '/clubs',
  PLAYERS: "/players",
  CHAT: '/chat',
  PLAYER_INFO: 'player/:id',
  CLUB_INFO: "club/:id",
  GAMES: "/games",
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

export const MilionFormat = (n:string):string => {
  console.log({n})
  if(n===null || n.trim().length === 0 || n === "null") return "NOT PROVIDED";
  let num = Math.round(Number(n)/1000000);
  let numStr = num.toString();
  let formattedNumStr = numberFormatWithCommas(numStr);
  return formattedNumStr + "m";
}

export const calculateAgeFromDateBirth = (dateOfBirth:string):number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if(monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())){
    age--;
  }
  return age;
}



export const identity = (value:any) => value;

export const xor = (a:boolean,b:boolean) => {
    return (a || b) && !(a && b);
}

export const competitionTypes = [
  {value : 'domestic_cup'  ,key : "DC"},
  {value: 'domestic_league', key: "DL"},
  {value: 'international_cup' , key: "IC"},
  {value: 'other' , key: "O"},
];


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
    errorText: "please type a valid email",
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


/**
 * generata bellamente da chatgpt
 */
export const countryEmojis:{[country:string] : string} = {
  "afghanistan": "🇦🇫",
  "albania": "🇦🇱",
  "algeria": "🇩🇿",
  "andorra": "🇦🇩",
  "angola": "🇦🇴",
  "antigua and barbuda": "🇦🇬",
  "argentina": "🇦🇷",
  "armenia": "🇦🇲",
  "australia": "🇦🇺",
  "austria": "🇦🇹",
  "azerbaijan": "🇦🇿",
  "bahamas": "🇧🇸",
  "bahrain": "🇧🇭",
  "bangladesh": "🇧🇩",
  "barbados": "🇧🇧",
  "belarus": "🇧🇾",
  "belgium": "🇧🇪",
  "belize": "🇧🇿",
  "benin": "🇧🇯",
  "bhutan": "🇧🇹",
  "bolivia": "🇧🇴",
  "bosnia and herzegovina": "🇧🇦",
  "botswana": "🇧🇼",
  "brazil": "🇧🇷",
  "brunei": "🇧🇳",
  "bulgaria": "🇧🇬",
  "burkina faso": "🇧🇫",
  "burundi": "🇧🇮",
  "cabo verde": "🇨🇻",
  "cambodia": "🇰🇭",
  "cameroon": "🇨🇲",
  "canada": "🇨🇦",
  "central african republic": "🇨🇫",
  "chad": "🇹🇩",
  "chile": "🇨🇱",
  "china": "🇨🇳",
  "colombia": "🇨🇴",
  "comoros": "🇰🇲",
  "congo, democratic republic of the": "🇨🇩",
  "congo, republic of the": "🇨🇬",
  "costa rica": "🇨🇷",
  "croatia": "🇭🇷",
  "cuba": "🇨🇺",
  "cyprus": "🇨🇾",
  "czech republic": "🇨🇿",
  "denmark": "🇩🇰",
  "djibouti": "🇩🇯",
  "dominica": "🇩🇲",
  "dominican republic": "🇩🇴",
  "ecuador": "🇪🇨",
  "egypt": "🇪🇬",
  "el salvador": "🇸🇻",
  "equatorial guinea": "🇬🇶",
  "eritrea": "🇪🇷",
  "estonia": "🇪🇪",
  "eswatini": "🇸🇿",
  "ethiopia": "🇪🇹",
  "fiji": "🇫🇯",
  "finland": "🇫🇮",
  "france": "🇫🇷",
  "gabon": "🇬🇦",
  "gambia": "🇬🇲",
  "georgia": "🇬🇪",
  "germany": "🇩🇪",
  "ghana": "🇬🇭",
  "greece": "🇬🇷",
  "grenada": "🇬🇩",
  "guatemala": "🇬🇹",
  "guinea": "🇬🇳",
  "guinea-bissau": "🇬🇼",
  "guyana": "🇬🇾",
  "haiti": "🇭🇹",
  "honduras": "🇭🇳",
  "hungary": "🇭🇺",
  "iceland": "🇮🇸",
  "india": "🇮🇳",
  "indonesia": "🇮🇩",
  "iran": "🇮🇷",
  "iraq": "🇮🇶",
  "ireland": "🇮🇪",
  "israel": "🇮🇱",
  "italy": "🇮🇹",
  "jamaica": "🇯🇲",
  "japan": "🇯🇵",
  "jordan": "🇯🇴",
  "kazakhstan": "🇰🇿",
  "kenya": "🇰🇪",
  "kiribati": "🇰🇮",
  "kuwait": "🇰🇼",
  "kyrgyzstan": "🇰🇬",
  "laos": "🇱🇦",
  "latvia": "🇱🇻",
  "lebanon": "🇱🇧",
  "lesotho": "🇱🇸",
  "liberia": "🇱🇷",
  "libya": "🇱🇾",
  "liechtenstein": "🇱🇮",
  "lithuania": "🇱🇹",
  "luxembourg": "🇱🇺",
  "madagascar": "🇲🇬",
  "malawi": "🇲🇼",
  "malaysia": "🇲🇾",
  "maldives": "🇲🇻",
  "mali": "🇲🇱",
  "malta": "🇲🇹",
  "marshall islands": "🇲🇭",
  "mauritania": "🇲🇷",
  "mauritius": "🇲🇺",
  "mexico": "🇲🇽",
  "micronesia": "🇫🇲",
  "moldova": "🇲🇩",
  "monaco": "🇲🇨",
  "mongolia": "🇲🇳",
  "montenegro": "🇲🇪",
  "morocco": "🇲🇦",
  "mozambique": "🇲🇿",
  "myanmar": "🇲🇲",
  "namibia": "🇳🇦",
  "nauru": "🇳🇷",
  "nepal": "🇳🇵",
  "netherlands": "🇳🇱",
  "new zealand": "🇳🇿",
  "nicaragua": "🇳🇮",
  "niger": "🇳🇪",
  "nigeria": "🇳🇬",
  "north korea": "🇰🇵",
  "north macedonia": "🇲🇰",
  "norway": "🇳🇴",
  "oman": "🇴🇲",
  "pakistan": "🇵🇰",
  "palau": "🇵🇼",
  "palestine": "🇵🇸",
  "panama": "🇵🇦",
  "papua new guinea": "🇵🇬",
  "paraguay": "🇵🇾",
  "peru": "🇵🇪",
  "philippines": "🇵🇭",
  "poland": "🇵🇱",
  "portugal": "🇵🇹",
  "qatar": "🇶🇦",
  "romania": "🇷🇴",
  "russia": "🇷🇺",
  "rwanda": "🇷🇼",
  "saint kitts and nevis": "🇰🇳",
  "saint lucia": "🇱🇨",
  "saint vincent and the grenadines": "🇻🇨",
  "samoa": "🇼🇸",
  "san marino": "🇸🇲",
  "sao tome and principe": "🇸🇹",
  "saudi arabia": "🇸🇦",
  "senegal": "🇸🇳",
  "serbia": "🇷🇸",
  "seychelles": "🇸🇨",
  "sierra leone": "🇸🇱",
  "singapore": "🇸🇬",
  "slovakia": "🇸🇰",
  "slovenia": "🇸🇮",
  "solomon islands": "🇸🇧",
  "somalia": "🇸🇴",
  "south africa": "🇿🇦",
  "south korea": "🇰🇷",
  "south sudan": "🇸🇸",
  "spain": "🇪🇸",
  "sri lanka": "🇱🇰",
  "sudan": "🇸🇩",
  "suriname": "🇸🇷",
  "sweden": "🇸🇪",
  "switzerland": "🇨🇭",
  "syria": "🇸🇾",
  "taiwan": "🇹🇼",
  "tajikistan": "🇹🇯",
  "tanzania": "🇹🇿",
  "thailand": "🇹🇭",
  "timor-leste": "🇹🇱",
  "togo": "🇹🇬",
  "tonga": "🇹🇴",
  "trinidad and tobago": "🇹🇹",
  "tunisia": "🇹🇳",
  "turkey": "🇹🇷",
  "turkmenistan": "🇹🇲",
  "tuvalu": "🇹🇻",
  "uganda": "🇺🇬",
  "ukraine": "🇺🇦",
  "united arab emirates": "🇦🇪",
  "united kingdom": "🇬🇧",
  "united states": "🇺🇸",
  "uruguay": "🇺🇾",
  "uzbekistan": "🇺🇿",
  "vanuatu": "🇻🇺",
  "vatican city": "🇻🇦",
  "venezuela": "🇻🇪",
  "vietnam": "🇻🇳",
  "yemen": "🇾🇪",
  "zambia": "🇿🇲",
  "zimbabwe": "🇿🇼"
};



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
export const URL_SHORT_PLAYERS = (pageNumber:number,pageSize:number) => getMainServerPath(`/player?limit=${pageSize}&page=${pageNumber}&sort=-market_value_in_eur&fields=first_name,last_name,image_url,market_value_in_eur,highest_market_value_in_eur&market_value_in_eur={"$ne":null}`);

export const URL_SHORT_PLAYERS_QUERIED = (pageNumber:number,pageSize:number,filters:PlayerSearchFilters):string => {
  const params = new URLSearchParams();
  const {min_market_value_in_eur, max_market_value_in_eur,... others} = filters;
  Object.entries(others).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.append(key, value);
    }
  });
  if(min_market_value_in_eur !== undefined || max_market_value_in_eur !== undefined){
    const gte = min_market_value_in_eur ?` "$gte": ${min_market_value_in_eur}` : "";
    const lte = max_market_value_in_eur ? ` "$lte": ${max_market_value_in_eur}` : "";
    params.append("market_value_in_eur", ` {${gte}${min_market_value_in_eur !== undefined && max_market_value_in_eur !== undefined ? "," : ""}${lte} }`);
  }




  const queryParams = params.toString();
  console.log({queryParams})
  return getMainServerPath(`/player?${queryParams}&limit=${pageSize}&page=${pageNumber}&sort=-market_value_in_eur&fields=first_name,last_name,image_url,market_value_in_eur,highest_market_value_in_eur`);
}
export const URL_SHORT_TEAMS = (pageNumber:number,pageSize:number)  => getMainServerPath(`/club?page=${pageNumber}&pagesize=${pageSize}`);

export const URL_ROOM_FROM_USER = (userId:string) => getMainServerPath(`/room/user/${userId}`);

export const URL_NEW_MESSAGE = (roomId:string) => getMainServerPath(`/room/newMessage/${roomId}`);

export const URL_CREATE_ROOM = getMainServerPath("/room");

export const URL_JOIN_ROOM = (roomId:string) => getMainServerPath(`/room/join/${roomId}`);

export const URL_LEAVE_ROOM = (roomId:string) => getMainServerPath(`/room/leave/${roomId}`);

export const URL_PLAYER_INFO = (playerID:string) => getMainServerPath(`/player/${playerID}`);

export const URL_CLUB_INFO = (teamID:string) => getMainServerPath(`/club/${teamID}`);

export const URL_COMPETITIONS_NAME = getMainServerPath("/competitions/names");

export const URL_GAMES = (filters: QueryFilters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.append(key, value);
    }
  });
  const queryString = params.toString();
  return getMainServerPath(`/game?${queryString}&sort=-season`);
}


export const URL_GAME_EVENTS = (gameId:string, pagesize: number) => getMainServerPath(`/game/${gameId}/events?limit=${pagesize}&page=1`);
/**
 * TODO:
 * 1. Erase player section
 * 2. Make more persistent navigation trace
 */

export const URL_PLAYER_EVENTS = (playerID: string) => getMainServerPath(`/gameEvents?player_id=${playerID}`);

export const URL_GAME_BY_ID = (gameID: string) => getMainServerPath(`/game/${gameID}`)

export const URL_NATIONALITIES = getMainServerPath("/player/nationalities");

export const URL_MIN_MAX_MARKET_VALUE = getMainServerPath("/player/market_value_in_eur/minmax");
