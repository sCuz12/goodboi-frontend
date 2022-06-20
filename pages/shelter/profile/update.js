import React, { useEffect, useState, useContext } from "react";
import CityDropdown from "../../../components/FormsComponents/CityDropdown";
import ShelterRoute from "../../../components/Routes/ShelterRoutes";
import axiosInstance from "../../../helpers/axios";
import { toast } from "react-toastify";
import { Context } from "../../../context";

function updateProfile() {
  const [shelterName, setShelterName] = useState("");
  const [shelterAddress, setShelterAddress] = useState("");
  const [shelterDescription, setShelterDescription] = useState("");
  const [shelterPhone, setShelterPhone] = useState("");
  const [selectedShelterCity, setSelectedShelterCity] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [currentValues, setCurrentValues] = useState([]);
  const { state, dispatch } = useContext(Context);

  /*page load trigger hook (no dependencies) */
  useEffect(() => {
    fetchCitiesById(1); //default retrieve Cyprus countries

    loadCurrentShelterDetails();
    console.log(currentValues);
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
    }
  };

  //*Handlers Start **//
  const citySelectionHandler = (value) => {
    console.log(value);
    const id = value;
    setSelectedShelterCity(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("shelter_name", shelterName);
    formData.append("address", shelterAddress);
    formData.append("phone", shelterPhone);
    formData.append("description", shelterDescription);
    formData.append("city_id", selectedShelterCity);

    axiosInstance
      .post("/api/shelter/profile", formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        //update shelter in global state
        dispatch({
          type: "UPDATE_SHELTER",
          payload: res.data,
        });
        //update local storage
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Profile updated Succesfully ");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  return (
    <ShelterRoute>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-44">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-wrap mb-6 -mx-3">
            {/*Shelter Name */}
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-first-name"
              >
                Shelter Name
              </label>
              <input
                name="sheter_name"
                onChange={(e) => {
                  setShelterName(e.target.value);
                }}
                defaultValue={currentValues.shelter_name}
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                id="grid-shelter-name"
                type="text"
              />
            </div>
            {/* Shelter Address*/}
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-first-name"
              >
                Shelter Address
              </label>
              <input
                defaultValue={currentValues.address}
                onChange={(e) => {
                  setShelterAddress(e.target.value);
                }}
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                id="grid-shelter-address"
                type="text"
              />
            </div>

            {/*Shelter Description */}
            <div className="w-full px-3">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Shelter Description
              </label>
              <textarea
                onChange={(e) => {
                  setShelterDescription(e.target.value);
                }}
                defaultValue={currentValues.description}
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none h-28 focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-shelter-description"
                type="textarea"
              />
            </div>

            {/*Shelter Phone */}
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-first-name"
              >
                Shelter Phone
              </label>
              <input
                onChange={(e) => {
                  setShelterPhone(e.target.value);
                }}
                defaultValue={currentValues.phone}
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                id="grid-shelter-phone"
                type="text"
                placeholder="22xxxxxx"
              />
            </div>

            {/* Cities*/}
            <CityDropdown
              data={citiesOptions}
              handler={citySelectionHandler}
              defaultValue={currentValues.city_id}
            />
          </div>
          <div className="flex flex-wrap">
            <button
              className="px-4 py-2 font-bold text-white rounded-full bg-basicPurple disabled:opacity-25 disabled:cursor-not-allowed hover:bg-orange-200"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </ShelterRoute>
  );
}

export default updateProfile;
