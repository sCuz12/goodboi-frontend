import { React, useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/Routes/UserRoutes";
import NormalUserRoute from "../../components/Routes/UserTypeRoutes";
import axiosInstance from "../../helpers/axios";
import StatsCard from "../../components/Cards/StatsCard";

export default function index() {
  const [userStats, setUserStats] = useState([]);

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    const token = window.localStorage.getItem("token");
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axiosInstance.get("/api/user/profile/stats");
    setUserStats(data.data);
  };

  return (
    <NormalUserRoute showSide={true}>
      <div className="max-w-2xl mx-auto mt-24">
        <h3 className="pb-4 header_titles font-cherryBomb">Dashboard</h3>
        <div className="grid gap-5 sm:grid-cols-3">
          {userStats.length != 0 &&
            userStats.map((item) => (
              <StatsCard
                key={item.name}
                title={item.name}
                count={item.count}
                url={item.url}
              />
            ))}
        </div>
      </div>
    </NormalUserRoute>
  );
}
