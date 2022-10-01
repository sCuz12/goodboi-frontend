import React, { useEffect, useState } from "react";
import AbovePageSection from "../../../components/Sections/AbovePageSection";
import PinkCircle from "../../../components/CustomImages/DogInCircle";
import axiosInstance from "../../../helpers/axios";
import NoResults from "../../../components/CustomImages/Illustrations/NoResults";
import LostListingCard from "../../../components/Cards/LostListingCard";

function index() {
  const [lostAnimals, setLostAnimals] = useState([]);

  useEffect(() => {
    getInitialLostDogs();
  }, []);

  /* This method gets all lost dogs and sets the states*/
  const getInitialLostDogs = async (pageNumber = 1) => {
    const { data } = await axiosInstance.get(
      `/api/animals/lost-dogs/all?page=${pageNumber}`
    );
    setLostAnimals(data.data);
  };
  return (
    <div className="pt-0 lg:pt-20 lg:pb-20">
      <section>
        <AbovePageSection
          title={"Be a dog saver"}
          description="Contribute to efforts to find lost dogs asdada asdadasdasdasdas asdsadsa"
          image={<PinkCircle />}
        />
      </section>
      <section>
        <div className="w-full h-auto md:flex lg:flex">
          {/* Listings */}
          <div className="p-4 lg:pr-8 lg:w-4/5 sm:px-16 ">
            {lostAnimals.length == 0 ? (
              <div className="flex justify-center w-full pt-20">
                <NoResults />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
                {lostAnimals.map((item) => (
                  <div
                    key={item.id}
                    className="p-0 overflow-hidden rounded-2xl lg:p-0 md:p-0 sm:p-30"
                  >
                    <LostListingCard item={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default index;
