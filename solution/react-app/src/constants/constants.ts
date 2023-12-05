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
    name: "home",
    linkLabel: "Home",
  },
  PLAYERS: {
    name: "players",
    linkLabel: "Players",
  },
  TEAMS: {
    name: "teams",
    linkLabel: "Teams",
  },
  MATCHES: {
    name: "matches",
    linkLabel: "Matches",
  },
};

export const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nis";


export const ROUTES = {
  AUTH: '/auth',
  HOME: '/',
  GALLERY: '/gallery',
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
    return [];
  }
  const slicedArray: T[][] = [];
  const numChunks = Math.ceil(array.length / size);
  for (let i = 0; i < numChunks; i++) {
    slicedArray.push(array.slice(i * size, (i + 1) * size));
  }
  return slicedArray;
};
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * FORM STATES
 */
export const filterFormState = {
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
export const DUMMY_GALLERY_PLAEYERS: Player[] = [
  {
    name: "Ronaldo",
    age: 36,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    country: "Portugal",
    description:
      "Ronaldo is a Portuguese professional footballer who plays as a forward for Serie A club Juventus and captains the Portugal national team. Often considered the best player in the world and widely regarded as one of the greatest players of all time, Ronaldo has won five Ballon d'Or awards and four European Golden Shoes, both of which are records for a European player. He has won 32 major trophies in his career, including seven league titles, five UEFA Champions Leagues, one UEFA European Championship, and one UEFA Nations League title. Ronaldo holds the records for the most goals (134) and assists (42) in the history of the UEFA Champions League. He is one of the few recorded players to have made over 1,100 professional career appearances and has scored over 780 senior career goals for club and country.",
    id: "1",
    generalScore: 9,
    statistics: {
      goals: 2,
      assists: 2,
      yellowCards: 2,
      redCards: 2,
      gamesPlayed: 2,
    },
  },
  {
    name: "Messi",
    age: 34,
    image: MessiImage,
    country: "Argentina",
    description:
      "Lionel Andrés Messi is an Argentine professional footballer who plays as a forward and captains both Spanish club Barcelona and the Argentina national team. Often considered as the best player in the world and widely regarded as one of the greatest players of all time, Messi has won a record six Ballon d'Or awards, and a record six European Golden Shoes. He has spent his entire professional career with Barcelona, where he has won a club-record 35 trophies, including ten La Liga titles, four UEFA Champions League titles and six Copas del Rey. A prolific goalscorer and creative playmaker, Messi holds the records for most goals in La Liga (474), a La Liga and European league season (50), most hat-tricks in the UEFA Champions League (8), and most assists in La Liga (192) and the Copa América (12). He has scored over 750 senior career goals for club and country.",
    id: "2",
    generalScore: 10,
    statistics: {
      goals: 2,
      assists: 2,
      yellowCards: 2,
      redCards: 2,
      gamesPlayed: 2,
    },
  },
  {
    name: "Neymar",
    age: 29,
    image: MessiImage,
    country: "Brazil",
    description:
      "Neymar da Silva Santos Júnior, known as Neymar, is a Brazilian professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and the Brazil national team. He is widely considered as one of the best players in the world. Neymar came into prominence at Santos, where he made his professional debut aged 17. He helped the club win two successive Campeonato Paulista championships, a Copa do Brasil, and the 2011 Copa Libertadores, Santos' first continental title since 1963. Neymar was twice named the South American Footballer of the Year, in 2011 and 2012, and soon relocated to Europe to join Barcelona. As part of Barça's attacking trio with Lionel Messi and Luis Suárez, he won the continental treble of La Liga, the Copa del Rey, and the UEFA Champions League, and finished third for the FIFA Ballon d'Or in 2015",
    id: "3",
    generalScore: 4,
    statistics: {
      goals: 2,
      assists: 2,
      yellowCards: 2,
      redCards: 2,
      gamesPlayed: 2,
    },
  },
];

export const DUMMY_HOME_PLAYERS: Player[] = [
  {
    name: "Messi0",
    image: DummyProfileImage,
    description: LOREM_IPSUM,
    country: "Argentina",
    age: 33,
    id: 0,
    generalScore: 10,
    statistics: {
      goals: 2,
      assists: 2,
      yellowCards: 2,
      redCards: 2,
      gamesPlayed: 2,
    },
  },
  {
    name: "Messi1",
    image: DummyProfileImage,
    description: LOREM_IPSUM,
    country: "Argentina",
    age: 33,
    id: 1,
    generalScore: 9,
    statistics: {
      goals: 2,
      assists: 2,
      yellowCards: 2,
      redCards: 2,
      gamesPlayed: 2,
    },
  },
  {
    name: "Messi2",
    image: DummyProfileImage,
    description: LOREM_IPSUM,
    country: "Argentina",
    age: 33,
    id: 2,
    generalScore: 8,
    statistics: {
      goals: 2,
      assists: 2,
      yellowCards: 2,
      redCards: 2,
      gamesPlayed: 2,
    },
  },
  {
    name: "Messi3",
    image: DummyProfileImage,
    description: LOREM_IPSUM,
    country: "Argentina",
    age: 33,
    id: 3,
    generalScore: 7,
    statistics: {
      goals: 2,
      assists: 2,
      yellowCards: 2,
      redCards: 2,
      gamesPlayed: 2,
    },
  },
  {
    name: "Messi4",
    image: DummyProfileImage,
    description: LOREM_IPSUM,
    country: "Argentina",
    age: 33,
    id: 4,
    generalScore: 6,
    statistics: {
      goals: 2,
      assists: 2,
      yellowCards: 2,
      redCards: 2,
      gamesPlayed: 2,
    },
  },
  {
    name: "Messi5",
    image: DummyProfileImage,
    description: LOREM_IPSUM,
    country: "Argentina",
    age: 33,
    id: 5,
    generalScore: 5,
    statistics: {
      goals: 2,
      assists: 2,
      yellowCards: 2,
      redCards: 2,
      gamesPlayed: 2,
    },
  },
];

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
