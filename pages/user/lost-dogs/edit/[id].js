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

function update() {
  const [name, setName] = useState("");
  const [dogTitle, setDogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [currentValues, setCurrentValues] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    loadListing();
    getCountryOptions();
  }, [id]);

  //render every time selectedCity Changes
  useEffect(() => {
    fetchLocationsByCity(selectedCity);
  }, [selectedCity]);

  const loadListing = async () => {
    try {
      const { data } = await axiosInstance.get("api/user/lost-dogs/edit/" + id);
      setCurrentValues(data.data);
      setSelectedCity(data.data.city_id);
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
    fetchCitiesById(1);
  };

  //*Fetching methods start **//
  const fetchCitiesById = async (id) => {
    const { data } = await axiosInstance.get(`/api/cities/${id}`);
    setCitiesOptions(data);
  };

  const fetchLocationsByCity = async (city_id) => {
    const { data } = await axiosInstance.get(`/api/locations/${city_id}`);
    setLocationsOptions(data);
  };

  /* handlers */
  const handleFormSubmit = () => {
    //TODO : Handle submit of form
  };
  const citySelectionHandler = (value) => {
    setSelectedCity(value);
  };

  const locationSelectionHandler = (value) => {
    setSelectedLocation(value);
  };

  const sizeChangeHandler = () => {};

  const coverImageUploadHandler = () => {};

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
              </div>
            </div>
            {/* Date Losted */}
            <div className="px-3 mb-6 md:w-full">
              <label className="form_label_text">Lost Date </label>
              <DatePicker
                defaultValue={moment(currentValues.dob)}
                dateFromat="YYYY-MM-dd"
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
                  defaultValue={currentValues.lost_at}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </NormalUserRoute>
  );
}

export default update;
