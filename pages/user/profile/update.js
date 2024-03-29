import React from "react";
import { Spin, Upload, Checkbox } from "antd";
import ImageUploadButton from "../../../components/Buttons/ImageUploadButton";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../../context";
import axiosInstance from "../../../helpers/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import NormalUserRoute from "../../../components/Routes/UserTypeRoutes";

function update() {
  const [currentData, setCurrentData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverimage, setCoverimage] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [allowEmails, setAllowEmails] = useState();
  const { state, dispatch } = useContext(Context);

  const router = useRouter();

  /* Handles the submition of the form*/
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    let formData = new FormData();
    if (coverimage != "") {
      formData.append("cover_photo", coverimage.fileList[0].originFileObj);
    }

    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", phone);
    formData.append("allow_emails", allowEmails);

    axiosInstance
      .post("/api/user/update_profile", formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setButtonLoading(false);
        toast.success("Profile Updated succesfully");
        //update context
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
        //update local storage
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchCurrentUserDetails();
  }, []);

  const coverImageUploadHandler = (fileList) => {
    if (fileList.file.status === "done") {
      console.log("done photo");
      // Get this url from response in real world.
      setCoverimage(fileList);
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const beforeUploadHandler = (file) => {
    //check the type of image
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    return isJpgOrPng && isLt2M;
  };

  const allowEmailsHandler = (e) => {
    setAllowEmails(e.target.checked);
  };

  const fetchCurrentUserDetails = async () => {
    try {
      const { data } = await axiosInstance.get("/api/loggedin-user", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      if (data.user) {
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setEmail(data.user.emai);
        setPhone(data.user.phone);
        setAllowEmails(data.user.allow_emails);
        setCurrentData(data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Checks if are required fields are completed */
  function disableButton() {
    return firstName == "" || lastName == "" || email == "";
  }

  return (
    <>
      {currentData && (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-24">
          <h3 className="text-center header_titles font-cherryBomb">
            Update User Profile
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-wrap mb-6 -mx-3">
              {/*First Name */}
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  name="first_name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  defaultValue={currentData.first_name}
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-user-name"
                  type="text"
                />
              </div>
              {/*Last Name */}
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-first-name"
                >
                  Last Name
                </label>
                <input
                  name="last_name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  defaultValue={currentData.last_name}
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-last-name"
                  type="text"
                />
              </div>
            </div>
            <div className="w-full mb-6 md:w-2/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                defaultValue={currentData.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                id="grid-user-email"
                type="text"
              />
            </div>
            {/** Cover Photo */}
            <div className="w-full md:w-1/2">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-last-name"
              >
                Cover Image
              </label>
              <Upload
                customRequest={dummyRequest}
                beforeUpload={beforeUploadHandler}
                onChange={coverImageUploadHandler}
                name="listing-cover"
                listType="picture-card"
                maxCount={1}
              >
                <ImageUploadButton />
              </Upload>
            </div>

            {/**Mobile Phone */}
            <div className="w-full mb-6 md:w-1/2 md:mb-0">
              <label className="form_label_text">Mobile Phone</label>
              <input
                defaultValue={currentData.phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                id="grid-user-email"
                type="text"
              />
            </div>

            {/**Allow emails */}
            <div className="w-full mb-6 md:w-1/2 md:mb-0 ">
              <span className="flex space-x-2">
                <label className="form_label_text">Allow Emails</label>
                <Checkbox
                  checked={allowEmails}
                  onChange={allowEmailsHandler}
                ></Checkbox>
              </span>
            </div>

            <div className="w-1/5">
              <button
                className="px-4 py-2 font-bold text-white rounded-full bg-basicPurple disabled:opacity-25 disabled:cursor-not-allowed hover:bg-orange-200"
                type="submit"
                disabled={disableButton() || buttonLoading}
              >
                {buttonLoading ? <Spin /> : "Submit"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default update;
