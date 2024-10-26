import { useEffect, useState } from "react";
import axios from "axios";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/employee",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) return setEmployees(response.data.data);
      return console.log(response.data.message);
    } catch (err) {
      if (err.response.data && err.response.data.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return false;
      } else {
        console.log("Internal server error");
        return false;
      }
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return employees;
};

const SaveEmployee = () => {
  const [messages, setMessages] = useState({});

  const handleSave = async (data) => {
    if (
      !data.username ||
      !data.fullname ||
      !data.email ||
      !data.password ||
      !data.id_jabatan ||
      !data.username_atasan
    ) {
      setMessages({
        status: "failed",
        message: "Semua Input Tidak Boleh Kosong",
      });
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/employee",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        setMessages({
          status: "success",
          message: response.data.message,
        });

        setTimeout(() => {
          window.location.href = "/employee";
          return true;
        }, 1500);
      } else {
        setMessages({
          status: "failed",
          message: response.data.message,
        });
        return false;
      }
    } catch (err) {
      if (err.response.data && err.response.data.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return false;
      } else {
        setMessages({
          status: "failed",
          message: "Internal server error",
        });
        return false;
      }
    }
  };

  return { messages, handleSave };
};

const DeleteEmployee = () => {
  const [messages, setMessages] = useState({});

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        process.env.REACT_APP_API_BASE_URL + `/employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        setMessages({
          status: "success",
          message: response.data.message,
        });
        return true;
      } else {
        setMessages({
          status: "failed",
          message: response.data.message,
        });
        return false;
      }
    } catch (err) {
      if (err.response.data && err.response.data.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return false;
      } else {
        setMessages({
          status: "failed",
          message: "Internal server error",
        });
        return false;
      }
    }
  };

  return { messages, handleDelete };
};

const UpdateEmployee = () => {
  const [messages, setMessages] = useState({});

  const handleUpdate = async (id, data) => {
    if (
      !data.fullname ||
      !data.email ||
      !data.id_jabatan ||
      !data.username_atasan
    ) {
      setMessages({
        status: "failed",
        message: "Semua Input Tidak Boleh Kosong",
      });
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        process.env.REACT_APP_API_BASE_URL + `/employee/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        setMessages({
          status: "success",
          message: response.data.message,
        });

        setTimeout(() => {
          window.location.href = "/employee";
          return true;
        }, 1500);
      } else {
        setMessages({
          status: "failed",
          message: response.data.message,
        });
        return false;
      }
    } catch (err) {
      if (err.response.data && err.response.data.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return false;
      } else {
        setMessages({
          status: "failed",
          message: "Internal server error",
        });
        return false;
      }
    }
  };

  return { messages, handleUpdate };
}

const EmployeeHook = {
  Employee,
  SaveEmployee,
  DeleteEmployee,
  UpdateEmployee,
};

export default EmployeeHook;
