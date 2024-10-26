import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages({});

    if (!username || !password) {
      setMessages({
        status: "failed",
        message: "Username dan password tidak boleh kosong",
      });
      return false;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/auth/login",
        {
          username,
          password,
        }
      );

      if (response.data.code === 200) {
        localStorage.setItem("token", response.data.data.token);
        window.location.href = "/dashboard";
        return true;
      } else {
        setMessages({
          status: "failed",
          message: response.data.message,
        });
        return false;
      }
    } catch (err) {
      setMessages({
        status: "failed",
        message: "Internal server error",
      });
      return false;
    }
  };

  return {
    username,
    password,
    messages,
    setUsername,
    setPassword,
    handleSubmit,
  };
};

const Logout = () => {
  const [messages, setMessages] = useState("");

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) return (window.location.href = "/");

      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/auth/logout",
        {
          token,
        }
      );

      if (response.data.code === 200) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        setMessages({ message: response.data.message });
      }
    } catch (err) {
      if (err.response.data && err.response.data.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return false;
      } else {
        setMessages({ message: "Internal server error" });
      }
    }
  };

  return { messages, handleLogout };
};

const AuthHook = { Login, Logout };

export default AuthHook;
