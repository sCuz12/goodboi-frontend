import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../../helpers/axios";
import Image from "next/image";
import ShelterInfoCard from "../../../components/Cards/ShelterInfoCard";
import ListingImageSlider from "../../../components/Slides/ListingImageSlider";
import { Tag } from "antd";
import Heart from "../../../components/Icons/Heart";
import CtaButton from "../../../components/Buttons/CtaButton";

const AnimalListingView = () => {
  const [animal, setAnimal] = useState({});
  const [listingImages, setListingImages] = useState([]);
  const [shelterInfo, setShelterInfo] = useState({});
  const [dogVaccinations, setDogVaccination] = useState([]);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    loadListingInfo();
  }, [id]);

  /*This method loads into state the single animal and listing_images */
  const loadListingInfo = async () => {
    const { data } = await axiosInstance.get("/api/animals/" + id);
    setAnimal(data.data);
    prepareListingImages(data.data.listing_images);
    prepareShelterInfo(data.data.shelter_info);
    setDogVaccination(data.data.vaccinations);
  };

  //This method prepares listing image and assign them to state array
  const prepareListingImages = async (listingImages) => {
    let slides = [];
    listingImages.map((image) => {
      let obj = {};
      obj["url"] = image;
      slides.push(obj);
    });
    console.log(slides);

    setListingImages(slides);
  };

  //prepares and appends the shelter info into state
  const prepareShelterInfo = async (shelterInfo) => {
    setShelterInfo(shelterInfo);
  };
  return (
    <>
      {animal.name && listingImages && (
        <div className="min-h-screen pt-10 pl-10">
          <div className="w-full">
            <section className="flex pt-24">
              {/* Image Div*/}
              <div className="grid w-2/5 place-items-center">
                {/* Photo container */}
                <div className="flex-shrink-0 pt-3 pb-2 pl-2 pr-2 m-12 rounded-full bg-roz">
                  {console.log(animal)}
                  <Image
                    src={
                      animal.cover_image ? animal.cover_image : "/default2.png"
                    }
                    className="border rounded-full "
                    height={350}
                    width={350}
                  />
                </div>
              </div>
              <div className="grid w-2/5 pt-12">
                <div className="">
                  <div className="flex flex-col">
                    {/*Upper info */}
                    <h1 className="text-4xl font-semibold font-cherryBomb ">
                      <div className="flex items-center text-center">
                        This is {animal.name}{" "}
                        <p className="">
                          <Heart />
                        </p>{" "}
                      </div>
                    </h1>
                    <p className="flex-grow h-44">{animal.description}</p>
                    <div className="w-2/5 pt-4">
                      <CtaButton
                        title="Call Shelter"
                        bgColor="bg-basicPurple"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* TODO : Paws icons*/}
            </section>
          </div>
          <section className="flex pt-10">
            <div className="grid w-3/5">
              {/*Characterestic skills*/}
              <div className="flex ">
                <div className="w-2/4">
                  <p className="charectiristics_labels">
                    Dog Name : <span>{animal.name}</span>
                  </p>
                  <p className="charectiristics_labels">
                    Age : <span>{animal.age}</span>
                  </p>
                </div>
                <p className="mr-5 text-roz h-5/5 border-x-2"></p>
                <div className="w-2/4">
                  <p className="charectiristics_labels">
                    Vaccinations :
                    <span className="ml-3">
                      {dogVaccinations.map((vaccination) => (
                        <Tag>{vaccination}</Tag>
                      ))}
                    </span>
                  </p>
                  <p className="charectiristics_labels">
                    Size : <span>{animal.size}</span>
                  </p>
                </div>
              </div>
            </div>
            {/* Shelter info section right*/}
            <div className="grid w-2/5 pl-16 mr-10 w-26 h-96">
              <ShelterInfoCard
                name={shelterInfo.shelter_name}
                city={shelterInfo.city}
                description={shelterInfo.description}
                cover_image={shelterInfo.cover_image}
                shelter_id={shelterInfo.id}
              />
            </div>
            {/*Next column*/}
          </section>
          {/** All pictures section */}
          <div className="flex items-center justify-center w-3/5 h-96 bg-blue rounded-3xl 6">
            <ListingImageSlider listingImages={listingImages} />
          </div>
        </div>
      )}
    </>
  );
};

export default AnimalListingView;
