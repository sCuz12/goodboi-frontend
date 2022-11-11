import React, { useEffect, useState, useContext } from "react";
import CityDropdown from "../../../components/FormsComponents/CityDropdown";
import ShelterRoute from "../../../components/Routes/ShelterRoutes";
import axiosInstance from "../../../helpers/axios";
import { toast } from "react-toastify";
import { Context } from "../../../context";
import { useRouter } from "next/router";
import Spin from "../../../components/Decos/Spin";
import {
  extractGroupNameFromFacebook,
  isValidSocialUrl,
} from "../../../helpers/functions";

function updateProfile() {
  const [shelterName, setShelterName] = useState("");
  const [shelterAddress, setShelterAddress] = useState("");
  const [shelterDescription, setShelterDescription] = useState("");
  const [shelterPhone, setShelterPhone] = useState("");
  const [selectedShelterCity, setSelectedShelterCity] = useState("");
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [currentValues, setCurrentValues] = useState([]);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const { state, dispatch } = useContext(Context);
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [facebookError, setFacebookError] = useState("");

  const router = useRouter();

  /*page load trigger hook (no dependencies) */
  useEffect(() => {
    fetchCitiesById(1); //default retrieve Cyprus countries

    loadCurrentShelterDetails();
  }, []);

  //*Fetching methods start **//
  const fetchCitiesById = async (id) => {
    const { data } = await axiosInstance.get(`/api/cities/${id}`);
    setCitiesOptions(data);
  };

  const loadCurrentShelterDetails = async () => {
    const { data } = await axiosInstance.get("/api/loggedin-user");
    if (data.shelter) {
      //UPDATE State fields with current
      setShelterName(data.shelter.shelter_name);
      setShelterAddress(data.shelter.address);
      setShelterPhone(data.shelter.phone);
      setShelterDescription(data.shelter.description);
      setSelectedShelterCity(data.shelter.city_id);
      setCurrentValues(data.shelter);
      setFacebook(data.shelter.facebook);
      setInstagram(data.shelter.instagram);
    }
    console.log(selectedShelterCity);
  };

  //*Handlers Start **//
  const citySelectionHandler = (value) => {
    const id = value;
    setSelectedShelterCity(id);
    console.log(selectedShelterCity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const facebook_pagename = "";

    if (facebook == "" || facebook == null) {
      setFacebook("");
    } else {
      facebook_pagename = extractGroupNameFromFacebook(facebook);
    }

    let formData = new FormData();
    formData.append("shelter_name", shelterName);
    formData.append("address", shelterAddress);
    formData.append("phone", shelterPhone);
    formData.append("description", shelterDescription);
    formData.append("city_id", selectedShelterCity);
    formData.append("instagram", instagram);

    if (facebook == "" || facebook == null) {
      formData.append("facebook", "");
    } else {
      formData.append("facebook", facebook);
    }
    formData.append("facebook_pagename", facebook_pagename);

    axiosInstance
      .post("/api/shelter/profile", formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        //update shelter in global state
        dispatch({
          type: "UPDATE_SHELTER",
          payload: res.data,
        });
        //update local storage
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Profile updated Succesfully ");
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err);
      });
  };

  const shelterNameChangeHandler = (e) => {
    const isValid = validateShelterName(e.target.value);
    if (isValid) {
      setShelterName(e.target.value);
    }
  };

  const validateShelterName = (name) => {
    if (name.length > 30) {
      setNameError("Name should be less than 30 characters");
      return false;
    }
    setNameError("");

    return true;
  };

  /*
   * Change Facebook textboox
   * Valids Facebook urls
   */
  const facebookUrlChangeHandler = (e) => {
    const faceBookInput = e.target.value;
    //if empty
    if (faceBookInput == "" || faceBookInput == null) {
      setFacebook("");
      setFacebookError("");
      return;
    }

    const isValidUrl = isValidSocialUrl(faceBookInput, "facebook");

    if (!isValidUrl) {
      setFacebook("");
      setFacebookError("Not a valid facebook url");
      return;
    }
    setFacebookError("");
    setFacebook(faceBookInput);
  };

  /*
   * Change Instagram textboox
   */
  const instagramChangeHandler = (e) => {
    const instagramInput = e.target.value;
    //if empty

    if (instagramInput == "" || instagramInput == null) {
      setInstagram("");
      return;
    }

    setInstagram(instagramInput);
  };

  const isSubmitDisabled = () => {
    return loading || facebookError != "" || selectedShelterCity == null;
  };

  return (
    <ShelterRoute>
      <div className="max-w-2xl pb-4 mx-auto mt-24">
        <h3 className="text-center header_titles font-cherryBomb">
          Update Shelter Profile
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-wrap mb-6 -mx-3">
              {/*Shelter Name */}
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-first-name"
                >
                  Shelter Name <span className="required"></span>
                </label>
                <input
                  name="sheter_name"
                  onChange={shelterNameChangeHandler}
                  defaultValue={currentValues.shelter_name}
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-shelter-name"
                  type="text"
                  required
                />
                {nameError ? (
                  <div className="error_messages">{nameError}</div>
                ) : (
                  ""
                )}
              </div>
              {/* Shelter Address*/}
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-first-name"
                >
                  Shelter Address <span className="required"></span>
                </label>
                <input
                  defaultValue={currentValues.address}
                  onChange={(e) => {
                    setShelterAddress(e.target.value);
                  }}
                  required
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-shelter-address"
                  type="text"
                />
              </div>

              {/*Shelter Description */}
              <div className="w-full px-3">
                <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                  Shelter Description <span className="required"></span>
                </label>
                <textarea
                  onChange={(e) => {
                    setShelterDescription(e.target.value);
                  }}
                  defaultValue={currentValues.description}
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none h-28 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-shelter-description"
                  type="textarea"
                  required
                />
              </div>

              {/*Shelter Phone */}
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-first-name"
                >
                  Shelter Phone <span className="required"></span>
                </label>
                <input
                  onChange={(e) => {
                    setShelterPhone(e.target.value);
                  }}
                  defaultValue={currentValues.phone}
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-shelter-phone"
                  type="text"
                  required
                  placeholder="22xxxxxx"
                />
              </div>
              {/* Cities*/}
              <CityDropdown
                data={citiesOptions}
                handler={citySelectionHandler}
                defaultValue={currentValues?.city_id ?? ""}
                required
              />

              {/*Instagram */}
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                  Instagram
                </label>
                <input
                  onChange={instagramChangeHandler}
                  defaultValue={currentValues.instagram}
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-shelter-instagram"
                  type="text"
                />
              </div>

              {/*Facebook */}
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                  Facebook
                </label>
                <input
                  onChange={facebookUrlChangeHandler}
                  defaultValue={currentValues.facebook}
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-shelter-facebook"
                  type="text"
                />
                {facebookError ? (
                  <div className="error_messages">{facebookError}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex flex-wrap">
              <button
                className="px-4 py-2 font-bold text-white rounded-full bg-basicPurple disabled:opacity-25 disabled:cursor-not-allowed hover:bg-orange-200"
                type="submit"
                disabled={isSubmitDisabled()}
              >
                {loading ? <Spin /> : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </ShelterRoute>
  );
}

export default updateProfile;
