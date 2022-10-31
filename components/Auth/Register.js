import { React, useState, useEffect } from "react";
import axiosInstance from "../../helpers/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import SolidPaw from "../Icons/SolidPaw";
import RectGuides from "../CustomImages/RectGuides";
import DogsWithCircle from "../CustomImages/DogsWithCircle";
import Heart from "../Icons/Heart";
import Image from "next/image";
import Spin from "../Decos/Spin";

export default function Register({ isShelter }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const feMessages = {
    text1: isShelter ? "Create your account" : "Create you account",
    text2: isShelter ? "Upload your dog" : "Create you account",
    text3: isShelter ? "Get Found!" : "Adopt!",
    title: isShelter ? " Sign up and go digital!" : " Sign up and go woof!",
    description: isShelter
      ? "Start listing your available dogs to be adopted today! By following the three steps below you can make your dogs visible to all the people who are looking for their next best friend.Of course, any help you might need just give us a shout"
      : "You are one step away of becoming a dog hero ",
  };

  /* Handle the submition of Registration*/
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`/api/register`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirm: confirmPassword,
        ...(isShelter ? { is_shelter: true } : {}),
      });
      toast.success("Registration Succesful. Please Login");
      setLoading(false);
      router.push("/login");
    } catch (err) {
      setLoading(false);
      if (err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error while Register");
      }
    }
  };
  return (
    <main className="pt-40 ">
      <section className="flex w-full ">
        <div className="w-full text-center lg:px-40 lg:w-2/3">
          <div className="flex w-full">
            <h1 className="text-6xl lg:text-7xl font-cherryBomb text-darkPurple">
              {feMessages.title}
            </h1>
          </div>

          <p className="text-lg">{feMessages.description}</p>
          <SolidPaw />
          {/* Section for the banner that shows the steps*/}
          <div className="flex justify-center w-full pt-20 pb-20 lg:ml-0">
            <RectGuides
              text_one={feMessages.text1}
              text_two={feMessages.text2}
              text_three={feMessages.text3}
            />
          </div>
        </div>
        <div className="flex justify-end hidden w-1/3 lg:block ">
          <DogsWithCircle />
          <SolidPaw />

          <div className="flex justify-center w-full">
            <Heart />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center flex-1 w-full px-20 pt-10">
        <div className="flex justify-center max-w-4xl shadow-2xl lg:w-1/2 sm:w-2/2 h-98 rounded-2xl bg-navyPink">
          <div className="w-2/4">
            <h2 className="justify-center pt-10 pb-10 text-2xl font-bold text-center lg:text-4xl text-basicFont font-cherryBomb">
              Register
            </h2>

            <form onSubmit={handleRegisterSubmit}>
              <div className="flex flex-col items-center">
                <div className="flex flex-col">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-state"
                  >
                    First Name <span className="required"></span>
                  </label>
                  <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                    <div className="m-2 text-gray-400" />

                    <input
                      type="text"
                      name="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      className="text-sm outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
              {/*Last name */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-state"
                  >
                    Last Name <span className="required"></span>
                  </label>
                  <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                    <div className="m-2 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                      className="text-sm outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
              {/*Email */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-state"
                  >
                    Email <span className="required"></span>
                  </label>
                  <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                    <div className="m-2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-sm outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
              {/*Password */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-state"
                  >
                    Password <span className="required"></span>
                  </label>
                  <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                    <div className="m-2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-sm outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
              {/*Confirm Password */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-state"
                  >
                    Confirm Password <span className="required"></span>
                  </label>
                  <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                    <div className="m-2 text-gray-400" />
                    <input
                      type="password"
                      name="confirm_password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="text-sm outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-center">
                <p>
                  Already have an account?
                  <a className="text-black underline" href="/login">
                    Login
                  </a>
                </p>
              </div>
              {/*Submit*/}
              <div className="text-center ">
                <button
                  disabled={loading ? true : false}
                  type="submit"
                  className="inline-block px-12 py-2 mt-5 mb-2 font-semibold text-white border-2 rounded-full bg-basicPurple border-green disabled:opacity-50"
                >
                  {loading ? <Spin /> : "Sign up"}
                </button>
              </div>
              <div className="flex justify-start w-3/4">
                <div className="pl-5 text-center pr-100 ">
                  <Image
                    src="/assets/banners/dog-4.png"
                    height={250}
                    width={250}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
