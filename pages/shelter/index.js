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
      <h1>Shelter Main page</h1>
    </ShelterRoute>
  );
}
