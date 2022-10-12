import { DatePicker, Radio, Upload } from "antd";
import React, { useEffect, useState } from "react";
import ImageUploadButton from "../../../../components/Buttons/ImageUploadButton";
import GeneralDropdown from "../../../../components/FormsComponents/GeneralDropdown";
import Input from "../../../../components/FormsComponents/Input";
import Label from "../../../../components/FormsComponents/Label";
import Textarea from "../../../../components/FormsComponents/Textarea";
import NormalUserRoute from "../../../../components/Routes/UserTypeRoutes";
import axiosInstance from "../../../../helpers/axios";
import { useRouter } from "next/router";
import moment from "moment";
import SubmitBtn from "../../../../components/FormsComponents/SubmitBtn";
import { toast } from "react-toastify";

function update() {
  const [name, setName] = useState("");
  const [dogTitle, setDogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [size, setSize] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [currentValues, setCurrentValues] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    loadListing();
    getCountryOptions();
    //TODO: Fetch dynamic the country
    fetchCitiesByCountryId(1);
  }, [id]);

  //render every time selectedCity Changes
  useEffect(() => {
    if (selectedCity != "") {
      fetchLocationsByCity(selectedCity);
    }
  }, [selectedCity]);

  const loadListing = async () => {
    try {
      const { data } = await axiosInstance.get(
        "api/user/mylistings/edit/" + id
      );
      setSelectedCity(data.data.city_id);
      setCurrentValues(data.data);
    } catch (e) {
      switch (e.response.status) {
        case 401:
          toast.error("Not authorized");
          router.push("/shelter/mylistings/view");
        default:
          router.push("/shelter/mylistings/view");
      }
    }
  };

  //load country options for dropdown
  const getCountryOptions = async () => {
    const { data } = await axiosInstance.get("/api/countries");
    setCountryOptions(data);
  };

  //*Fetching methods start **//
  const fetchCitiesByCountryId = async (id) => {
    const { data } = await axiosInstance.get(`/api/cities/${id}`);
    setCitiesOptions(data);
  };

  const fetchLocationsByCity = async (city_id) => {
    const { data } = await axiosInstance.get(`/api/locations/${city_id}`);
    setLocationsOptions(data);
  };

  /* handlers */
  const handleFormSubmit = (e) => {
    //TODO : Handle submit of form
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();

    if (selectedCity != "") {
      formData.append("city_id", selectedCity);
    }

    if (lostDate != "") {
      formData.append("lost_at", lostDate);
    }

    if (name != "") {
      formData.append("name", name);
    }
    if (dogTitle != "") {
      formData.append("title", dogTitle);
    }
    if (description != "") {
      formData.append("description", description);
    }
    if (selectedLocation != "") {
      formData.append("location_id", selectedLocation);
    }

    if (size != "") {
      formData.append("size", size);
    }

    if (reward != "") {
      formData.append("reward", reward);
    }

    let submitUrl;

    if (currentValues.listing_type === "lost") {
      submitUrl = `/api/user/lost-dogs/edit/${id}`;
    }

    if (currentValues.listing_type === "found") {
      submitUrl = `/api/user/found-dogs/edit/${id}`;
    }

    //send post to api
    axiosInstance
      .post(submitUrl, formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Lost Dog listing succesfully uploaded");
        router.push("/user/mylistings");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };
  const citySelectionHandler = (value) => {
    setSelectedCity(value);
  };

  const locationSelectionHandler = (value) => {
    setSelectedLocation(value);
  };

  const sizeChangeHandler = (e) => {
    setSize(e.target.value);
  };

  return (
    <NormalUserRoute showSide={true}>
      {currentValues.length !== 0 && (
        <div className="max-w-2xl mx-auto mt-24">
          <h3 className="pb-4 text-center header_titles font-cherryBomb">
            Update Lost Dog
          </h3>

          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-wrap mb-6 -mx-3">
                {/*Dog name */}
                <div className="px-3 mb-6 md:w-1/2 md:mb-0">
                  <Label labelName="Dog Name" isRequired={true} />
                  <Input
                    type="text"
                    defaultValue={currentValues.name}
                    isRequired={true}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="px-3 mb-6 md:w-1/2 md:mb-0">
                  <Label labelName="Dog Title" isRequired={true} />
                  <Input
                    type="text"
                    isRequired={true}
                    defaultValue={currentValues.title}
                    onChange={(e) => {
                      setDogTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full px-3 mb-6">
                <Label labelName="Description" isRequired={true} />
                <Textarea
                  defaultValue={currentValues.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="px-3 mb-6 md:w-1/2 md:mb-0">
                  <Label labelName="Dog Size" isRequired={true} />
                  <div className="relative">
                    <Radio.Group
                      onChange={sizeChangeHandler}
                      defaultValue={currentValues.size}
                      required
                    >
                      <Radio.Button value="s">Small</Radio.Button>
                      <Radio.Button value="m">Medium</Radio.Button>
                      <Radio.Button value="l">Large</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
                {currentValues.listing_type == "lost" && (
                  <div className="px-3 mb-6 md:w-1/2 md:mb-0">
                    <label className="form_label_text">Reward €</label>
                    <input
                      defaultValue={currentValues.reward}
                      className="form_input_box"
                      id="input-dog-lost-date"
                      type="number"
                      pattern="[0-9]*"
                      onChange={(e) => {
                        setReward(e.target.value);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Date Losted */}
            <div className="px-3 mb-6 md:w-full">
              {console.log(currentValues.lost_date)}
              <label className="form_label_text">Lost Date </label>
              <DatePicker
                defaultValue={
                  currentValues.listing_type == "lost"
                    ? moment(currentValues.lost_date, "YYYY-MM-DD")
                    : moment(currentValues.found_date, "YYYY-MM-DD")
                }
                onChange={(date, dateString) => {
                  setLostDate(dateString);
                }}
                required
              />
            </div>

            {/* City */}
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 pb-4 md:w-1/2">
                <GeneralDropdown
                  defaultValue={selectedCity}
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
                  defaultValue={currentValues.location_id}
                />
              </div>
            </div>

            <SubmitBtn
              disableButtonHandler={false}
              name="update"
              isLoading={loading}
            />
          </form>
        </div>
      )}
    </NormalUserRoute>
  );
}

export default update;
