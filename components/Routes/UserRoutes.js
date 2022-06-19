import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../helpers/axios";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState();

  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = window.localStorage.getItem("token");
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      const data = await axiosInstance.get("/api/current-user", {
        headers: { "Content-Type": "application/json" },
      });
      if (data.status === 200) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return <>{!ok ? <h1>loading</h1> : <div>{children}</div>}</>;
};

export default UserRoute;
