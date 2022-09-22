import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context";
import { useRouter } from "next/router";
import axiosInstance from "../../../helpers/axios";
import Image from "next/image";
import ShelterInfoCard from "../../../components/Cards/ShelterInfoCard";
import ListingImageSlider from "../../../components/Slides/ListingImageSlider";
import { Tag } from "antd";
import Heart from "../../../components/Icons/Heart";
import Telephone from "../../../components/Modals/Telephone";
import CallShelter from "../../../components/Buttons/CallShelter";
import { Tabs } from "antd";
import { useMediaQuery } from "../../../utils/hooks";
import DogInfo from "../../../components/Mobile/dogInfo";
import SolidPaw from "../../../components/Icons/SolidPaw";
import { BsEye } from "react-icons/bs";
import SocialShare from "../../../components/Sections/SocialShare";
import LoginActionModal from "../../../components/Modals/LoginActionModal";

const { TabPane } = Tabs;

const AnimalListingView = () => {
  const [animal, setAnimal] = useState({});
  const [listingImages, setListingImages] = useState([]);
  const [shelterInfo, setShelterInfo] = useState({});
  const [dogVaccinations, setDogVaccination] = useState([]);
  const [showTelModal, setShowTelModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { state, dispatch } = useContext(Context);

  const { user } = state;

  // Check wether is on mobileview
  const isMobile = useMediaQuery("(max-width: 960px)");

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    loadListingInfo();
    getCurrentUrl();
  }, [id]);

  function getCurrentUrl() {
    setCurrentUrl(window.location.href);
  }

  /*This method loads into state the single animal and listing_images */
  const loadListingInfo = async () => {
    //get the ip
    //TODO: Change the service that is used for retrieving the ip
    const response = await fetch("https://geolocation-db.com/json/");
    const dataClient = await response.json();
    const ip = dataClient.IPv4;
    console.log("hitting");
    const { data } = await axiosInstance.get("/api/animals/" + id, {
      headers: {
        "Client-Ip": ip,
      },
    });
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
    setListingImages(slides);
  };

  //prepares and appends the shelter info into state
  const prepareShelterInfo = async (shelterInfo) => {
    setShelterInfo(shelterInfo);
  };

  //handle call shelter
  const callShelterHandler = async () => {
    //if login display data otherwise login modal
    if (user) {
      setShowTelModal(true);
    } else {
      setShowLoginModal(true);
    }
  };
  return (
    <>
      {animal.name && listingImages && (
        <div className="min-h-screen pt-10 lg:pl-6">
          <div className="w-full">
            <section className="flex flex-col lg:pt-10 lg:flex-row ">
              {/* Image Div*/}
              <div className="grid p-6 lg:w-2/5 place-items-center">
                {/* Photo container */}
                <div className="flex-shrink-0 pt-3 pb-2 pl-2 pr-2 rounded-full lg:m-12 bg-roz">
                  <Image
                    src={
                      animal.cover_image ? animal.cover_image : "/default2.png"
                    }
                    className="border rounded-full "
                    height={450}
                    width={450}
                  />
                </div>
              </div>
              <div className="grid w-full pt-12 lg:w-3/5">
                <div className="flex flex-col items-center">
                  {/*Upper info */}
                  <h1 className="text-4xl font-semibold font-cherryBomb lg:w-full">
                    <div className="flex items-center text-center">
                      This is {animal.name}
                      <div className="">
                        <Heart />
                      </div>
                    </div>
                  </h1>
                  <p className="flex h-40 lg:w-full">{animal.description}</p>
                  <div className="flex-col justify-center w-3/5 lg:w-full">
                    {!isMobile ? (
                      <div className="flex flex-row w-full">
                        <div className="pt-4 lg:w-2/5 ">
                          <CallShelter onclick={callShelterHandler} />
                        </div>
                        <SolidPaw />
                      </div>
                    ) : (
                      <div className="pt-4 lg:w-2/5 ">
                        <CallShelter onclick={callShelterHandler} />
                      </div>
                    )}

                    <div className="pt-4 lg:w-2/5">
                      <SocialShare currentUrl={currentUrl} />
                    </div>
                  </div>
                  {isMobile ? (
                    <div className="w-3/4 pt-20 round">
                      <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Dog Info" key="1">
                          {/*Characterestic skills*/}
                          <DogInfo
                            dog={animal}
                            vaccinations={dogVaccinations}
                          />
                        </TabPane>
                        <TabPane
                          tabBarStyle={"color:black"}
                          tab="Shelter"
                          key="2"
                        >
                          <ShelterInfoCard
                            name={shelterInfo.shelter_name}
                            city={shelterInfo.city}
                            description={shelterInfo.description}
                            cover_image={shelterInfo.cover_image}
                            shelter_id={shelterInfo.id}
                          />
                        </TabPane>
                        <TabPane tab="Photos" key="3">
                          {/** All pictures section */}
                          <div className="items-center justify-center w-full p-3 bg-center h-80 bg-blue rounded-3xl">
                            <ListingImageSlider listingImages={listingImages} />
                          </div>
                        </TabPane>
                      </Tabs>
                    </div>
                  ) : null}
                </div>
              </div>
              {/* TODO : Paws icons*/}
            </section>
          </div>
          <section className="hidden pt-10 lg:flex lg:flex-row">
            <div className="grid w-full lg:w-3/5">
              {/*Characterestic skills*/}
              <div className="flex ">
                <div className="w-2/4">
                  <p className="charectiristics_labels">
                    Dog Name :{" "}
                    <span className="charectiristics_values">
                      {animal.name}
                    </span>
                  </p>
                  <p className="charectiristics_labels">
                    Age :{" "}
                    <span className="charectiristics_values">{animal.age}</span>
                  </p>
                  <p className="charectiristics_labels">
                    Hometown:
                    <span className="charectiristics_values">
                      {animal.city}
                    </span>
                  </p>
                  <p className="charectiristics_labels">
                    Likes:
                    <span className="charectiristics_values">
                      {animal.total_favourites}
                    </span>
                  </p>
                  <SolidPaw />
                </div>
                <p className="mr-5 text-roz h-5/5 border-x-2"></p>
                <div className="w-2/4">
                  <p className="charectiristics_labels">
                    Vaccinations :
                    <span className="ml-3 ">
                      {dogVaccinations.map((vaccination) => (
                        <Tag key={vaccination}>{vaccination}</Tag>
                      ))}
                    </span>
                  </p>
                  <p className="charectiristics_labels">
                    Size :{" "}
                    <span className="charectiristics_values">
                      {animal.size.toUpperCase()}
                    </span>
                  </p>
                  <p className="flex charectiristics_labels">
                    Views:{" "}
                    <span className="flex items-center pl-2 pr-2 align-middle charectiristics_values">
                      <BsEye /> {animal.total_views}
                    </span>
                  </p>
                  <Heart />
                </div>
              </div>
            </div>
            {/* Shelter info section right*/}
            <div className="grid lg:mr-10 lg:w-2/5 lg:pl-16 lg:w-26 lg:h-96 sm:h-80">
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
          <div className="items-center justify-center hidden p-8 bg-center lg:flex lg:w-3/5 md:w-3/5 sm:w-5/5 h-120 bg-blue rounded-3xl">
            <ListingImageSlider listingImages={listingImages} />
          </div>
        </div>
      )}
      {showTelModal && (
        <Telephone
          phone={shelterInfo.phone}
          email={shelterInfo.email}
          address={shelterInfo.address}
          onclose={() => setShowTelModal(false)}
        />
      )}

      {showLoginModal && (
        <LoginActionModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default AnimalListingView;
