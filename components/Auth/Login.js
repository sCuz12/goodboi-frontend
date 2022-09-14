import React, { useState, useContext, useEffect } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Context } from "../../context";
import { useRouter } from "next/router";
import axiosInstance from "../../helpers/axios";
import SolidPaw from "../Icons/SolidPaw";
import DogInCicle from "../CustomImages/DogInCircle";
import { toast } from "react-toastify";
import ForgotPassword from "../Modals/ForgotPassword";
import Spin from "../Decos/Spin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const { state, dispatch } = useContext(Context);
  const [openforgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/login", {
        email,
        password,
      });

      window.localStorage.setItem("token", res.data.token);
      //dispatch to global state for user
      dispatch({
        type: "LOGIN",
        payload: res.data.user,
      });

      //save token into local storage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      //if user is shelter
      if (res.data.user.shelter) {
        //profile not complete redirect to update profile for shelter
        if (res.data.user.shelter.is_profile_complete === 0) {
          router.push("/shelter/profile/update");
        }
        router.push("/shelter");
      }

      //redirect
      router.push("/");
    } catch (err) {
      console.log(err);
      if (err.response) {
        setLoading(false);
        toast.error(err.response.data.error);
      } else {
        toast("Error on login");
      }
    }
  };

  const onSubmitResetPassword = async () => {
    try {
      const { data } = await axiosInstance.post("/api/forgot-password?", {
        email: resetEmail,
      });
      toast.success("Email succesfully sent .Please check your Email");
    } catch (err) {
      if (err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error while Sending the reset email");
      }
    }
    setOpenForgotPasswordModal(false);
  };

  return (
    <main className="pt-20">
      <section className="flex w-full text-center h-82 lg:px-40">
        <div className="w-full lg:w-3/5">
          <div className="items-center w-full lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-cherryBomb text-darkPurple">
              Login and go<p>woof</p>{" "}
            </h1>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <SolidPaw />
        </div>
        <div className="hidden lg:w-3/5 lg:justify-end lg:flex lg:pl-48 sm:flex-col lg:block">
          <div className="pl-10">
            <div className="flex">
              <DogInCicle image="dog-2.png" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center flex-1 w-full px-20 pt-10 text-center ">
        <div className="flex justify-center max-w-4xl mb-10 shadow-2xl sm:w-2/2 lg:w-1/2 h-98 rounded-2xl bg-navyPink sm:w-full">
          <div className="w-2/4">
            <h2 className="pt-10 pb-10 text-2xl font-bold lg:text-4xl text-basicFont font-cherryBomb">
              Welcome Back
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
                <div className="textfield_input_container">
                  <FaRegEnvelope className="m-2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="flex-1 text-sm outline-none"
                  />
                </div>
                <div className="textfield_input_container">
                  <MdLockOutline className="m-2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 text-sm outline-none"
                  />
                </div>
                <a onClick={() => setOpenForgotPasswordModal(true)}>
                  <p className="items-start pt-5 text-darkPink">
                    Forgot Password?
                  </p>
                </a>
                <div className="items-start pt-3 pt-5 text-left"></div>
                <div className="pt-5 mt-5">
                  <button
                    type="submit"
                    className="inline-block px-12 py-2 mt-5 mb-2 font-semibold text-white border-2 rounded-full bg-basicPurple border-green"
                    disabled={loading ? true : false}
                  >
                    {loading ? <Spin /> : "Sign up"}
                  </button>
                </div>
                <p className="text-bold">
                  Don't have an account?{" "}
                  <a className="text-black underline" href="/register">
                    Sign up now
                  </a>
                </p>
              </div>
            </form>
          </div>{" "}
          {/*login*/}
        </div>
      </section>
      {openforgotPasswordModal && (
        <ForgotPassword
          onclose={() => {
            setOpenForgotPasswordModal(false);
          }}
          onsubmit={onSubmitResetPassword}
          resetemail={resetEmail}
          setresetemail={setResetEmail}
        />
      )}
    </main>
  );
}
