import { React, useContext, useEffect } from "react";
import ShelterRoute from "../../components/Routes/ShelterRoutes";
import { Context } from "../../context";

export default function index() {
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {});

  return (
    <ShelterRoute>
      <div className="max-w-2xl mx-auto mt-24">
        <h3 className="pb-4 header_titles font-cherryBomb">Dashboard</h3>
      </div>
    </ShelterRoute>
  );
}
