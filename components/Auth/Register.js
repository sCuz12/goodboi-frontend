import { React, useState, useEffect } from "react";
import axiosInstance from "../../helpers/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import SolidPaw from "../Icons/SolidPaw";
import RectGuides from "../CustomImages/RectGuides";
import DogsWithCircle from "../CustomImages/DogsWithCircle";
import Heart from "../Icons/Heart";
import Image from "next/image";
import { headers } from "../../next.config";

export default function Register({ isShelter }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const router = useRouter();

  const feMessages = {
    text1: isShelter ? "Create your account" : "Create you account",
    text2: isShelter ? "Upload your dog" : "Create you account",
    text3: isShelter ? "Get Found!" : "Adopt!",
    title: isShelter ? " Sign up and go digital!" : " Sign up and go woof!",
    description: isShelter
      ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  /* Handle the submition of Registration*/
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(`/api/register`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirm: confirmPassword,
        ...(isShelter ? { is_shelter: true } : {}),
      });
      toast.success("Registration Succesful. Please Login");
      router.push("/login");
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data.message);
    }
  };
  return (
    <main className="pt-40">
      <section className="flex w-full">
        <div className="w-3/5 ">
          <div className="flex w-full">
            <h1 className="text-7xl font-cherryBomb text-darkPurple">
              {feMessages.title}
            </h1>
          </div>

          <p>{feMessages.description}</p>
          <SolidPaw />
          {/* Section for the banner that shows the steps*/}
          <div className="flex w-full pt-20 pb-20">
            <RectGuides
              text_one={feMessages.text1}
              text_two={feMessages.text2}
              text_three={feMessages.text3}
            />
          </div>
        </div>
        <div className="flex justify-end w-2/5">
          <div className="pl-10 ">
            <DogsWithCircle />
            <SolidPaw />
          </div>

          <div className="flex justify-center w-full">
            <Heart />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center flex-1 w-full px-20 pt-10">
        <div className="flex justify-center w-1/2 max-w-4xl shadow-2xl h-98 rounded-2xl bg-navyPink">
          <div className="w-2/4">
            <h2 className="justify-center pt-10 pb-10 text-2xl font-bold text-center text-basicFont font-kdam">
              Register
            </h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="flex flex-col items-center">
                <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                  <div className="m-2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="text-sm outline-none"
                  />
                </div>
              </div>
              {/*Last name */}
              <div className="flex flex-col items-center">
                <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                  <div className="m-2 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="text-sm outline-none"
                  />
                </div>
              </div>
              {/*Email */}
              <div className="flex flex-col items-center">
                <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                  <div className="m-2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="text-sm outline-none"
                  />
                </div>
              </div>
              {/*Password */}
              <div className="flex flex-col items-center">
                <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                  <div className="m-2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="text-sm outline-none"
                  />
                </div>
              </div>
              {/*Confirm Password */}
              <div className="flex flex-col items-center">
                <div className="flex items-center p-2 mb-3 bg-white border rounded-lg shadow-2xl w-80">
                  <div className="m-2 text-gray-400" />
                  <input
                    type="password"
                    name="confirm_password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="text-sm outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p>
                  Already have an account?
                  <a className="text-black underline" href>
                    Login
                  </a>
                </p>
              </div>
              {/*Submit*/}
              <div className="text-center ">
                <button
                  type="submit"
                  className="inline-block px-12 py-2 mt-5 mb-2 font-semibold text-white border-2 rounded-full bg-basicPurple border-green"
                >
                  Sign up
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
