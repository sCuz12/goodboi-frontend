import React, { useState, useContext, useEffect } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Context } from "../../context";
import { useRouter } from "next/router";
import axiosInstance from "../../helpers/axios";
import SolidPaw from "../Icons/SolidPaw";
import DogInCicle from "../CustomImages/DogInCircle";
import Heart from "../Icons/Heart";
import { toast } from "react-toastify";

export default function Login() {
  //TODO : Remove defaults on email,password on production
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(Context);

  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    console.log(state);
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (res.data.user.shelter.is_profile_complete === 0) {
        router.push("/shelter/profile/update");
      }

      //redirect
      router.push("/");
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err.response.data.error);
    }
  };

  return (
    <main className="pt-40">
      <section className="flex w-full">
        <div className="w-3/5">
          <div className="flex w-full">
            <h1 className="text-7xl font-cherryBomb text-darkPurple">
              Find your new <p>best friend!</p>{" "}
            </h1>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <SolidPaw />
        </div>
        <div className="flex justify-end w-3/5 pl-48">
          <div className="pl-10 ">
            <DogInCicle image="dog-2.png" />
          </div>

          <div className="flex justify-center w-full">
            <Heart />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center flex-1 w-full px-20 pt-20 text-center">
        <div className="flex justify-center w-1/2 max-w-4xl shadow-2xl h-98 rounded-2xl bg-navyPink">
          <div className="w-2/4">
            <h2 className="pt-10 pb-10 text-2xl font-bold text-basicFont font-kdam">
              Welcome Back
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
                <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                  <FaRegEnvelope className="m-2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="flex-1 text-sm outline-none"
                  />
                </div>
                <div className="flex items-center p-2 bg-white border rounded-lg shadow-2xl w-80">
                  <MdLockOutline className="m-2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 text-sm outline-none"
                  />
                </div>
                <p className="items-start pt-5 text-darkPink">
                  Forgot Password?
                </p>
                <div className="pt-5 mt-5">
                  <button
                    type="submit"
                    className="inline-block px-12 py-2 mt-5 mb-2 font-semibold text-white border-2 rounded-full bg-basicPurple border-green"
                  >
                    Sign In
                  </button>
                </div>
                <p className="text-bold">
                  Don't have an account?{" "}
                  <a className="text-black underline" href="">
                    Sign up now
                  </a>
                </p>
              </div>
            </form>
          </div>{" "}
          {/*login*/}
        </div>
      </section>
    </main>
  );
}
