import { useEffect, useState } from "react";
import axios from "axios";

const SaveAbsensi = () => {
  const [messages, setMessages] = useState({});

  const handleSave = async (data) => {
    try {
      if (!data.mode_absen || !data.keterangan) {
        setMessages({
          status: "failed",
          message: "Semua input tidak boleh kosong",
        });
        return false;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/absensi",
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
          window.location.href = "/absensi";
          return true;
        }, 2000);
      } else {
        setMessages({
          status: "failed",
          message: response.data.message,
        });
        return false;
      }
    } catch (err) {
      console.log(err);
      if (err.response.data && err.response.data.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
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

const Absensi = () => {
  const [absensi, setAbsensi] = useState([]);

  const getAbsensi = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/absensi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) return setAbsensi(response.data.data);
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
    getAbsensi();
  }, []);

  return absensi;
};

const AbsensiHook = { SaveAbsensi, Absensi };

export default AbsensiHook;
