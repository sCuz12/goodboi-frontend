import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../../../../context";
import axiosInstance from "../../../../helpers/axios";

function index() {
  const { state, dispatch } = useContext(Context);

  const router = useRouter();

  const { code } = router.query;

  useEffect(() => {
    if (code != null) {
      axiosInstance
        .post("/api/auth/callback/facebook", null, {
          params: {
            code: code,
          },
        })
        .then((res) => {
          window.localStorage.setItem("token", res.data.token);
          dispatch({
            type: "LOGIN",
            payload: res.data.user,
          });
          //save token into local storage
          localStorage.setItem("user", JSON.stringify(res.data.user));
          //redirect
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [code]);
  return <div>index</div>;
}

export default index;
