import React from "react";
import CreateForm from "../../../components/Form/Dogs/createForm";
import NormalUserRoute from "../../../components/Routes/UserTypeRoutes";

function create() {
  return (
    <NormalUserRoute showSide={true}>
      <CreateForm type="found" />
    </NormalUserRoute>
  );
}

export default create;
