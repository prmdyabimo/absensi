import { useEffect, useState } from "react";
import axios from "axios";

const Jadwal = () => {
  const [jadwal, setJadwal] = useState([]);

  const getJadwal = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/jadwal",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.data);

      if (response.data.code === 200) return setJadwal(response.data.data);
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
    getJadwal();
  }, []);

  return jadwal;
};

const SaveJadwal = () => {
  const [messages, setMessages] = useState({});

  const handleSave = async (data) => {
    if (!data.hari || !data.jam_masuk || !data.jam_keluar) {
      setMessages({
        status: "failed",
        message: "Semua input tidak boleh kosong",
      });
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/jadwal",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        setMessages({ status: "success", message: response.data.message });
        setTimeout(() => {
          window.location.href = "/jadwal";
          return true;
        }, 1500);
      } else {
        setMessages({ status: "failed", message: response.data.message });
        return false;
      }
    } catch (err) {
      if (err.response.data && err.response.data.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return false;
      } else {
        setMessages({ status: "failed", message: "Internal server error" });
        return false;
      }
    }
  };

  return { messages, handleSave };
};

const UpdateJadwal = () => {
  const [messages, setMessages] = useState({});

  const handleUpdate = async (id, data) => {
    if (!data.hari || !data.jam_masuk || !data.jam_keluar) {
      setMessages({
        status: "failed",
        message: "Semua input tidak boleh kosong",
      });
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        process.env.REACT_APP_API_BASE_URL + `/jadwal/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        setMessages({ status: "success", message: response.data.message });
        setTimeout(() => {
          window.location.href = "/jadwal";
          return true;
        }, 1500);
      } else {
        setMessages({ status: "failed", message: response.data.message });
        return false;
      }
    } catch (err) {
      if (err.response.data && err.response.data.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return false;
      } else {
        setMessages({ status: "failed", message: "Internal server error" });
        return false;
      }
    }
  };

  return { messages, handleUpdate };
};

const DeleteJadwal = () => {
  const [messages, setMessages] = useState({});

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        process.env.REACT_APP_API_BASE_URL + `/jadwal/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        setMessages({ status: "success", message: response.data.message });
        return true;
      } else {
        setMessages({ status: "failed", message: response.data.message });
        return false;
      }
    } catch (err) {
      if (err.response.data && err.response.data.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return false;
      } else {
        setMessages({ status: "failed", message: "Internal server error" });
        return false;
      }
    }
  };

  return { messages, handleDelete };
};

const JadwalHook = {
  Jadwal,
  SaveJadwal,
  UpdateJadwal,
  DeleteJadwal,
};

export default JadwalHook;
