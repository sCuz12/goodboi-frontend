import { React, useContext, useEffect } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/Routes/UserRoutes";

export default function index() {
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {});

  return (
    <UserRoute>
      <div>index</div>
    </UserRoute>
  );
}
