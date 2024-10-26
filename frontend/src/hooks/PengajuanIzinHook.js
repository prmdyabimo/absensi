import { useEffect, useState } from "react";
import axios from "axios";

const PengajuanIzin = () => {
  const [pengajuanIzin, setPengajuanIzin] = useState([]);

  const getPengajuanIzin = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/pengajuan-izin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPengajuanIzin(response.data.data);
    } catch (err) {
      if (err.response.data && err.response.data.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return false;
      } else {
        console.log("Internal server error");
      }
    }
  };

  useEffect(() => {
    getPengajuanIzin();
  }, []);

  return pengajuanIzin;
};

const SavePengajuanIzin = () => {
  const [messages, setMessages] = useState({});

  const handleSave = async (data) => {
    try {
      if (!data.jenis_izin || !data.tanggal || !data.keterangan) {
        setMessages({
          status: "failed",
          message: "Semua input tidak boleh kosong",
        });
        return false;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/pengajuan-izin",
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
          window.location.href = "/pengajuan-izin";
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

const ApprovePengejuanIzin = () => {
  const [messages, setMessages] = useState({});

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        process.env.REACT_APP_API_BASE_URL + `/pengajuan-izin/${id}`,
        {},
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

  return { messages, handleApprove };
};

const RejectPengajuanIzin = () => {
  const [messages, setMessages] = useState({});

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        process.env.REACT_APP_API_BASE_URL + `/pengajuan-izin/reject/${id}`,
        {},
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

  return { messages, handleReject };
};

const PengajuanIzinHook = {
  PengajuanIzin,
  SavePengajuanIzin,
  ApprovePengejuanIzin,
  RejectPengajuanIzin,
};

export default PengajuanIzinHook;
