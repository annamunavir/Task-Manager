import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

const initialState = {
  auth: {
    user: null,
    isLogin: false,
    error: null,
  },
  tasks: {
    list: [],
    loading: true,
    error: null,
  },
};

const appReducer = (state, action) => {
  switch (action.type) {
    /* AUTH  */
    case "LOGIN_SUCCESS":
      return {
        ...state,
        auth: { ...state.auth, user: action.payload, isLogin: true, error: null },
      };
    case "LOGIN_ERROR":
      return { ...state, auth: { ...state.auth, error: action.payload } };
    case "SIGNUP":
      return {
        ...state,
        auth: { ...state.auth, user: action.payload, isLogin: true },
      };
    case "LOGOUT":
      return {
        ...state,
        auth: { user: null, isLogin: false, error: null },
      };
    case "SET_ISLOGIN":
      return {
        ...state,
        auth: { ...state.auth, isLogin: action.payload }
      };


    /*  TASKS */
    case "SET_TASKS":
      return { ...state, tasks: { ...state.tasks, list: action.payload, loading: false } };
    case "ADD_TASK":
      return { ...state, tasks: { ...state.tasks, list: [...state.tasks.list, action.payload] } };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          list: state.tasks.list.map((t) =>
            t.id === action.payload.id ? action.payload : t
          ),
        },
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: { ...state.tasks, list: state.tasks.list.filter((t) => t.id !== action.payload) },
      };
    case "TASK_LOADING":
      return { ...state, tasks: { ...state.tasks, loading: true } };
    case "TASK_ERROR":
      return { ...state, tasks: { ...state.tasks, loading: false, error: action.payload } };
    

    default:
      return state;
  }
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const navigate = useNavigate();

  /*  AUTH LOGIC */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(savedUser) });
    }
  }, []);

// random token
const generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const login = (email, password) => {
  const storedUser = JSON.parse(localStorage.getItem("newUser"));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    // Generate token
    const token = generateToken();

    const userWithToken = { ...storedUser, token };
    localStorage.setItem("user", JSON.stringify(userWithToken));

    dispatch({ type: "LOGIN_SUCCESS", payload: userWithToken });
    return true;
  }

  dispatch({ type: "LOGIN_ERROR", payload: "Invalid credentials" });
  return false;
};

const signUp = (newUser) => {
  localStorage.setItem("newUser", JSON.stringify(newUser));

 
  dispatch({ type: "SIGNUP", payload: newUser });
};

const logout = () => {
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
  navigate("/");
};


  const setIsLogin = (value) => {
  dispatch({ type: "SET_ISLOGIN", payload: value });
};


  /* TASK LOGIC  */
  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: "TASK_LOADING" });
      try {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
          dispatch({ type: "SET_TASKS", payload: JSON.parse(savedTasks) });
        } else {
          const res = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
          dispatch({ type: "SET_TASKS", payload: res.data });
          localStorage.setItem("tasks", JSON.stringify(res.data));
        }
      } catch (error) {
        dispatch({ type: "TASK_ERROR", payload: error.message });
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (state.tasks.list.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(state.tasks.list));
    }
  }, [state.tasks.list]);

  const value = {
    state,
    dispatch,
    login,
    signUp,
    logout,
    setIsLogin
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
