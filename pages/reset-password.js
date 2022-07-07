import React, { useState } from "react";
import axiosInstance from "../helpers/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function reset_password() {
  const [newPassword, setNewPassword] = useState("");
  const [newConfPassword, setConfPassword] = useState("");
  const router = useRouter();
  //get the token from the query param
  const { token, email } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/api/reset-password", {
        password: newPassword,
        password_confirmation: newConfPassword,
        email: email,
        token: token,
      });
      toast.success("Password reset succesfully ");
      router.push("/login");
    } catch (e) {
      toast.error();
      console.log(e);
    }
  };
  return (
    <main className="pt-20">
      <section className="flex flex-col items-center justify-center flex-1 w-full px-20 pt-10 text-center ">
        <div className="flex justify-center max-w-4xl mb-10 shadow-2xl sm:w-2/2 lg:w-1/2 h-98 rounded-2xl bg-navyPink sm:w-full">
          <div className="w-2/4">
            <h2 className="pt-10 pb-10 text-2xl font-bold text-basicFont font-kdam">
              Reset Password
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
                <div className="textfield_input_container">
                  <input
                    type="password"
                    name="newPassword"
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="flex-1 text-sm outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="textfield_input_container">
                  <input
                    type="password"
                    name="newPassword"
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="Confirmation Password"
                    className="flex-1 text-sm outline-none"
                  />
                </div>
              </div>
              <div className="pt-5 mt-5">
                <button
                  type="submit"
                  className="inline-block px-12 py-2 mt-5 mb-2 font-semibold text-white border-2 rounded-full bg-basicPurple border-green"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default reset_password;
