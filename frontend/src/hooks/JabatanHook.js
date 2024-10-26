import { useState, useEffect } from "react";
import axios from "axios";

const Jabatan = () => {
  const [jabatan, setJabatan] = useState([]);

  const getJabatan = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/jabatan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) return setJabatan(response.data.data);
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
    getJabatan();
  }, []);

  return jabatan;
};

const SaveJabatan = () => {
  const [messages, setMessages] = useState({});

  const handleSave = async (data) => {
    if (!data.nama_jabatan) {
      setMessages({
        status: "failed",
        message: "Nama Jabatan Tidak Boleh Kosong",
      });
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/jabatan",
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
          window.location.href = "/jabatan";
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

const DeleteJabatan = () => {
  const [messages, setMessages] = useState({});

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        process.env.REACT_APP_API_BASE_URL + `/jabatan/${id}`,
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

const UpdateJabatan = () => {
  const [messages, setMessages] = useState({});

  const handleUpdate = async (id, data) => {
    if (!data.nama_jabatan) {
      setMessages({
        status: "failed",
        message: "Nama Jabatan Tidak Boleh Kosong",
      });
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        process.env.REACT_APP_API_BASE_URL + `/jabatan/${id}`,
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
          window.location.href = "/jabatan";
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
};

const JabatanHook = {
  Jabatan,
  SaveJabatan,
  DeleteJabatan,
  UpdateJabatan,
};

export default JabatanHook;
