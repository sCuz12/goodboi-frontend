import { React, useContext, useEffect, useState } from "react";
import StatsCard from "../../components/Cards/StatsCard";
import ShelterRoute from "../../components/Routes/ShelterRoutes";
import { Context } from "../../context";
import axiosInstance from "../../helpers/axios";

export default function index() {
  const [shelterStats, setShelterStats] = useState([]);

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    fetchShelterStats();
  }, []);

  const fetchShelterStats = async () => {
    const token = window.localStorage.getItem("token");
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axiosInstance.get("/api/shelter/profile/stats");
    setShelterStats(data.data);
  };

  return (
    <ShelterRoute>
      <div className="max-w-2xl mx-auto mt-24">
        <h3 className="pb-4 header_titles font-cherryBomb">Dashboard</h3>
        <div className="grid gap-5 sm:grid-cols-3">
          {shelterStats.length != 0 &&
            shelterStats.map((item) => (
              <StatsCard
                key={item.name}
                title={item.name}
                count={item.count}
                url={item.url}
              />
            ))}
        </div>
      </div>
    </ShelterRoute>
  );
}
