import { React, useEffect, useState, useContext } from "react";
import ShelterRoute from "../../../components/Routes/ShelterRoutes";
import { DatePicker, Upload, Radio, Select, Empty } from "antd";
import axiosInstance from "../../../helpers/axios";
import ImageUploadButton from "../../../components/Buttons/ImageUploadButton";
import { Context } from "../../../context";
import { toast } from "react-toastify";
import CityDropdown from "../../../components/FormsComponents/CityDropdown";
import { useRouter } from "next/router";

function create() {
  const [countryOptions, setCountryOptions] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [coverImageUrl, setCoverImageUrl] = useState([]);
  const [listingsImages, setListingsImages] = useState([]);
  const [dobDate, setDobDate] = useState("");
  const [size, setSize] = useState("");
  const [availableVaccines, setAvailableVaccines] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedVaccinations, setSelectedVaccinations] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogDescription, setDogDescription] = useState("");

  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const { Option } = Select;
  const { user } = state;
  /*page load trigger hook (no dependencies) */
  useEffect(() => {
    const getCountryOptions = async () => {
      const { data } = await axiosInstance.get("/api/countries");
      // console.log(data);
      setCountryOptions(data);
    };
    getCountryOptions();
    fetchCitiesById(1); //default retrieve Cyprus countries
    fetchAvailableVacinnes();
    setSelectedCity(1); //default
  }, []);

  //*User change dependency */
  useEffect(() => {
    //prevent unverified shelter to list a dog
    if (user) {
      if (user.shelter.is_profile_complete === 0) {
        router.push("/shelter/profile/update");
      }
    }
  }, [user]);

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

    return true;
  };

  //*Handlers Start **//
  const citySelectionHandler = (value) => {
    const id = value;
    setSelectedCity(id);
  };

  const vaccineSelectedHandler = (value) => {
    setSelectedVaccinations(value);
  };

  const coverImageUploadHandler = (fileList) => {
    if (fileList.file.status === "done") {
      console.log("done photo");
      // Get this url from response in real world.
      setCoverImageUrl(fileList);
    }
    if (fileList.file.status === "error") {
      console.log("Error uploading cover photo");
      setCoverImageUrl();
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const sizeChangeHandler = (e) => {
    const allowed_values = ["m", "s", "l"];
    if (!allowed_values.includes(e.target.value)) {
      //default to small
      setSize("s");
      return;
    }
    setSize(e.target.value);
  };
  const listingsImagesUploadHandler = async (fileList) => {
    if (fileList.file.status === "done") {
      setListingsImages(fileList);
    }
    if (fileList.file.status === "error") {
      setListingsImages();
    }
  };
  const countryChangedHandler = async (event) => {
    const index = event.target.selectedIndex;
    const el = event.target.childNodes[index];
    const selectedOptionId = el.getAttribute("id");
    fetchCitiesById(selectedOptionId);
  };

  const titleChangeHandler = async (e) => {
    setPostTitle(e.target.value);
  };

  //*Fetching methods start **//
  const fetchCitiesById = async (id) => {
    const { data } = await axiosInstance.get(`/api/cities/${id}`);
    setCitiesOptions(data);
  };

  const fetchAvailableVacinnes = async (id) => {
    const { data } = await axiosInstance.get("/api/vaccinations");
    setAvailableVaccines(data);
  };

  /*Checks if are required fields are completed */
  function disableButton() {
    return (
      dogName == "" ||
      dogDescription == "" ||
      postTitle == "" ||
      size == "" ||
      dobDate == ""
    );
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("cover_photo", coverImageUrl.fileList[0].originFileObj);
    for (let i = 0; i < listingsImages.fileList.length; i++) {
      formData.append("images[]", listingsImages.fileList[i].originFileObj);
    }

    formData.append("city_id", selectedCity);
    formData.append("dob", dobDate);
    for (const vaccine of selectedVaccinations) {
      formData.append("vaccinations[]", vaccine);
    }
    formData.append("user_id", user.id);
    formData.append("shelter_id", user.shelter.id);
    formData.append("title", postTitle);
    formData.append("name", dogName);
    formData.append("description", dogDescription);
    formData.append("size", size);

    axiosInstance
      .post("/api/shelter/animals/create", formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })

      .then(() => {
        toast.success("Dog listing succesfully uploaded");
        router.push("/shelter/mylistings/view");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  return (
    <ShelterRoute>
      {user !== null && (
        <div className="max-w-2xl mx-auto mt-24">
          <h3 className="pb-4 header_titles font-cherryBomb">
            Create Dog Listing
          </h3>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-wrap mb-6 -mx-3">
                {/*Dog name */}
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-first-name"
                  >
                    Dog Name
                  </label>
                  <input
                    onChange={(e) => {
                      setDogName(e.target.value);
                    }}
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                    id="grid-dog-name"
                    type="text"
                  />
                </div>
                {/*Dog Title */}
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-first-name"
                  >
                    Dog Title
                  </label>
                  <input
                    onChange={titleChangeHandler}
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                    id="grid-dog-title"
                    type="text"
                  />
                </div>

                {/*Dog Description */}
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-last-name"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={(e) => {
                      setDogDescription(e.target.value);
                    }}
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none h-28 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-description"
                    type="textarea"
                  />
                </div>

                {/* Size*/}
                <div className="w-full px-3 pt-3 mb-6 md:w-full md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-first-name"
                  >
                    Dog Size
                  </label>
                  <div className="relative">
                    <Radio.Group onChange={sizeChangeHandler}>
                      <Radio.Button value="s">Small</Radio.Button>
                      <Radio.Button value="m">Medium</Radio.Button>
                      <Radio.Button value="l">Large</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              {/** Age */}
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-age"
                  >
                    Date Of Birth
                  </label>
                  <DatePicker
                    dateFromat="YYYY-MM-dd"
                    onChange={(date, dateString) => {
                      setDobDate(dateString);
                    }}
                  />
                </div>
              </div>
              {/** Vaccinations */}
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-age"
                  >
                    Vaccinations
                  </label>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select Vaccinations"
                    onChange={vaccineSelectedHandler}
                  >
                    {availableVaccines.map((vaccine) => {
                      return (
                        <Option value={vaccine.id} label={vaccine.name}>
                          {vaccine.name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>

              {/** Cover Photo */}
              <div className="w-full px-3 md:w-1/2">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-last-name"
                >
                  Cover Image
                </label>
                <Upload
                  beforeUpload={beforeUploadHandler}
                  onChange={coverImageUploadHandler}
                  customRequest={dummyRequest}
                  name="listing-cover"
                  listType="picture-card"
                  maxCount={1}
                >
                  <ImageUploadButton />
                </Upload>
              </div>
              {/* Listing Images*/}
              <div className="w-full px-3 md:w-1/2">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-last-name"
                >
                  Listing Images
                </label>
                <Upload
                  maxCount={3}
                  customRequest={dummyRequest}
                  onChange={listingsImagesUploadHandler}
                  name="listing-cover"
                  listType="picture-card"
                >
                  <ImageUploadButton />
                </Upload>
              </div>
              {/*Countries flex */}
              <div className="flex flex-wrap mb-2 -mx-3">
                {/*Countries dropdown*/}
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-state"
                  >
                    Country
                  </label>
                  <div className="relative">
                    <select
                      onChange={countryChangedHandler}
                      className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-country"
                    >
                      {countryOptions.map((option) => {
                        return <option id={option.id}>{option.name}</option>;
                      })}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                      <svg
                        className="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/*Cities dropwdown */}
                <CityDropdown
                  data={citiesOptions}
                  handler={citySelectionHandler}
                />
              </div>

              <div className="flex flex-wrap">
                <button
                  className="px-4 py-2 font-bold text-white rounded-full bg-basicPurple disabled:opacity-25 disabled:cursor-not-allowed hover:bg-orange-200"
                  type="submit"
                  disabled={disableButton()}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </ShelterRoute>
  );
}

export default create;
