import useFetch from "./useFetch";
import { useCallback, useContext } from "react";
import {
  LOGIN_URL,
  LoginResponse,
  SIGNUP_URL,
  SignUpResponse,
} from "../auth/authFunctions";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginParams {
  email: string;
  password: string;
  redirectPath: string;
}

interface SignUpParams {
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
  email: string;
  redirectPath: string;
}

type loginFn = ({ email, password }: LoginParams) => void;

type signupFn = (params: SignUpParams) => void;
/**
 * Custom hook that provides authentication functionality in a React application.
 * @returns An object with the following properties and functions:
 * - loading: A boolean indicating whether an API request is currently in progress.
 * - error: A string containing an error message if an error occurred during an API request.
 * - login: A function that takes an object parameter with `email`, `password`, and `redirectPath` properties, and initiates a login request.
 * - signup: A function that takes an object parameter with `name`, `surname`, `password`, `confirmPassword`, `email`, and `redirectPath` properties, and initiates a signup request.
 * - setError: A function that sets the error message.
 * - logout: A function that logs the user out.
 * - loggedIn: A boolean indicating whether the user is currently logged in.
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const { loading, error, fetchData, setError } = useFetch();
  const {
    login: ctxLogin,
    logout: ctxLogout,
    loggedIn,
  } = useContext(AuthContext);

  const loginCallback = useCallback(
    (redirectPath: string) => {
      return (data: LoginResponse | SignUpResponse) => {
        if (data.status === "fail") {
          setError(data.message ? data.message : "Error");
          return;
        }
        if (data.status === "success") {
          ctxLogin(data.token, data.user.name, data.user.email , data.user._id);
          navigate(-2);
        }
      };
    },
    [ctxLogin, navigate, setError]
  );

  const login: loginFn = useCallback(
    ({ email, password, redirectPath }) => {
      fetchData<LoginResponse>(
        {
          url: LOGIN_URL,
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
        loginCallback(redirectPath)
      );
    },
    [fetchData, loginCallback]
  );

  const signup: signupFn = useCallback(
    ({ name, surname, password, confirmPassword, email, redirectPath }) => {
      fetchData<SignUpResponse>(
        {
          url: SIGNUP_URL,
          method: "POST",
          body: JSON.stringify({
            name,
            surname,
            password,
            confirmPassword,
            email,
          }),
        },
        loginCallback(redirectPath)
      );
    },
    [fetchData, loginCallback]
  );

  const logout = useCallback(() => {
    ctxLogout();
  }, [ctxLogout]);

  return { loading, error, login, signup, setError, logout, loggedIn };
};
