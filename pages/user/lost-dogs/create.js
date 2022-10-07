import React, { useEffect, useState } from "react";
import NormalUserRoute from "../../../components/Routes/UserTypeRoutes";
import { DatePicker, Upload, Radio, Spin } from "antd";
import ImageUploadButton from "../../../components/Buttons/ImageUploadButton";
import { ImageUploadValidator } from "../../../helpers/functions";
import axiosInstance from "../../../helpers/axios";
import GeneralDropdown from "../../../components/FormsComponents/GeneralDropdown";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function create() {
  const [uploadCoverError, setUploadCoverError] = useState("");
  const [uploadListingPhotosError, setUploadListingPhotoError] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCity, setSelectedCity] = useState("1");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [location, setLocation] = useState("");
  const [reward, setReward] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [coverImageUrl, setCoverImageUrl] = useState([]);
  const [listingsImages, setListingsImages] = useState([]);
  const [size, setSize] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchAllCities();
  }, []);

  //render every time selectedCity Changes
  useEffect(() => {
    fetchLocationsByCity(selectedCity);
  }, [selectedCity]);

  const sizeChangeHandler = (e) => {
    const allowed_values = ["m", "s", "l"];
    if (!allowed_values.includes(e.target.value)) {
      //default to smalljbhjmgjhghjghjghjk
      setSize("s");
      return;
    }
    setSize(e.target.value);
  };

  /**Handlers */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    let formData = new FormData();
    formData.append("cover_photo", coverImageUrl.fileList[0].originFileObj);

    for (let i = 0; i < listingsImages.fileList.length; i++) {
      formData.append("images[]", listingsImages.fileList[i].originFileObj);
    }
    formData.append("city_id", selectedCity);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location_id", selectedLocation);
    formData.append("reward", reward);
    formData.append("size", size);
    formData.append("lost_date", lostDate);
    formData.append("name", name);

    axiosInstance
      .post("/api/user/lost_dogs/create", formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })

      .then((res) => {
        setButtonLoading(false);
        router.push("/user/lost-dogs/mylistings");
        toast.success("Dog succesfully listed");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response);
      });
  };

  const coverImageUploadHandler = (fileList) => {
    setUploadCoverError("");
    const canUpload = ImageUploadValidator(fileList.file);

    //Passed the validator
    if (canUpload != true) {
      setUploadCoverError(canUpload);
      return;
    }

    if (fileList.file.status === "done") {
      console.log("done photo");
      // Get this url from response in real world.
      setCoverImageUrl(fileList);
    }
    if (fileList.file.status === "error") {
      setUploadCoverError("Error on uploading cover photo,please retry");
      setCoverImageUrl("");
    }
  };

  const removeListingImageHandler = () => {
    setUploadListingPhotoError("");
  };

  const listingsImagesUploadHandler = (fileList) => {
    const canUpload = ImageUploadValidator(fileList.file);

    if (canUpload != true) {
      setUploadListingPhotoError(canUpload);
      return;
    }

    if (fileList.file.status === "done") {
      setListingsImages(fileList);
    }
    if (fileList.file.status === "error") {
      setUploadListingPhotoError("Error on uploading picture,please retry");
      setListingsImages();
    }
  };

  const citySelectionHandler = (value) => {
    const id = value;
    setSelectedCity(value);
  };

  const locationSelectionHandler = (value) => {
    setSelectedLocation(value);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  //*Fetching data from APIS **//
  const fetchAllCities = async (id) => {
    const { data } = await axiosInstance.get(`/api/cities`);
    setCitiesOptions(data);
  };

  const fetchLocationsByCity = async (city_id) => {
    const { data } = await axiosInstance.get(`/api/locations/${city_id}`);
    setLocationsOptions(data);
  };

  /*Checks if are required fields are completed */
  function disableButton() {
    return (
      name == "" ||
      description == "" ||
      selectedLocation == "" ||
      size == "" ||
      lostDate == "" ||
      uploadCoverError != "" ||
      uploadListingPhotosError != "" ||
      title == ""
    );
  }

  return (
    <NormalUserRoute showSide={true}>
      <div className="max-w-2xl mx-auto mt-24">
        <h3 className="pb-4 text-center header_titles font-cherryBomb">
          Create Lost Dog
        </h3>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-wrap mb-6 -mx-3">
              {/*Dog name */}
              <div className="px-3 mb-6 md:w-1/2 md:mb-0">
                <label className="form_label_text">
                  Lost Dog Name
                  <span className="required"></span>
                </label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="form_input_box"
                  id="input-dog-name"
                  type="text"
                  required
                />
              </div>

              {/*Dog Title */}
              <div className="px-3 mb-6 md:w-1/2 md:mb-0">
                <label className="form_label_text">
                  Dog Title
                  <span className="required"></span>
                </label>
                <input
                  className="form_input_box"
                  id="input-dog-title"
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
              </div>
              {/*Dog Description  FULL WIDTH*/}
              <div className="w-full px-3 mb-6">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-last-name"
                >
                  Description
                  <span className="required"></span>
                </label>
                <textarea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="form_input_textarea"
                  id="grid-description"
                  type="textarea"
                  required
                />
              </div>
              <div className="px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-first-name"
                >
                  Dog Size
                  <span className="required"></span>
                </label>
                <div className="relative">
                  <Radio.Group onChange={sizeChangeHandler} required>
                    <Radio.Button value="s">Small</Radio.Button>
                    <Radio.Button value="m">Medium</Radio.Button>
                    <Radio.Button value="l">Large</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              {/* Lost date */}
              <div className="px-3 mb-6 md:w-1/2 md:mb-0">
                <label className="form_label_text">Reward €</label>
                <input
                  className="form_input_box"
                  id="input-dog-lost-date"
                  type="number"
                  pattern="[0-9]*"
                  defaultValue={0}
                  onChange={(e) => {
                    setReward(e.target.value);
                  }}
                />
              </div>
              {/* Date Losted */}
              <div className="px-3 mb-6 md:w-full">
                <label className="form_label_text">Lost Date </label>
                <DatePicker
                  dateFromat="YYYY-MM-dd"
                  onChange={(date, dateString) => {
                    setLostDate(dateString);
                  }}
                  required
                />
              </div>

              {/* City */}
              <div className="w-full px-3 pb-4 md:w-1/2">
                <GeneralDropdown
                  data={citiesOptions}
                  handler={citySelectionHandler}
                  labelName="City"
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <GeneralDropdown
                  data={locationsOptions}
                  handler={locationSelectionHandler}
                  labelName="Location"
                />
              </div>

              {/** Cover Photo */}
              <div className="w-full px-3 md:w-2/2">
                <label className="form_label_text">
                  Cover Image
                  <span className="required"></span>
                </label>
                <Upload
                  onChange={coverImageUploadHandler}
                  customRequest={dummyRequest}
                  name="listing-cover"
                  listType="picture-card"
                  maxCount={1}
                  accept="image/png, image/jpeg"
                  required
                >
                  <ImageUploadButton />
                </Upload>
                {uploadCoverError && (
                  <div className="error_messages">{uploadCoverError}</div>
                )}
              </div>
              {/* Listing Images*/}
              <div className="w-full px-3 md:w-2/2">
                <label className="form_label_text">
                  Listing Images
                  <span className="required"></span>
                </label>
                <Upload
                  onRemove={removeListingImageHandler}
                  maxCount={4}
                  customRequest={dummyRequest}
                  onChange={listingsImagesUploadHandler}
                  name="listing-cover"
                  listType="picture-card"
                  accept="image/png, image/jpeg"
                >
                  <ImageUploadButton />
                </Upload>
                {uploadListingPhotosError && (
                  <div className="error_messages">
                    {uploadListingPhotosError}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap">
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
      </div>
    </NormalUserRoute>
  );
}

export default create;
