import React from "react";
import PropTypes from "prop-types";
import LostListingCard from "../../Cards/LostListingCard";
import NavButton from "../../Buttons/NavButton";
import ListingCard from "../../Cards/ListingCard";
import ShelterCard from "../../Cards/ShelterCard";

const SHELTER_TYPE = "shelters";
const LOST_DOGS_TYPE = "lost";

function ListingsRowSection({ title, listings, listingType }) {
  //decide what component should render based on type

  function decideComponent(type, item) {
    switch (type) {
      case LOST_DOGS_TYPE:
        return <LostListingCard item={item} />;
      case SHELTER_TYPE:
        return (
          <ShelterCard
            id={item.id}
            name={item.shelter_name}
            image={item.cover_image}
            city={item.city}
          />
        );
      default:
        return;
    }
  }

  return (
    <div className="pt-6">
      <h3 className="pb-5 header_titles">{title}</h3>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((item) => (
          <div key={item.id} className="mb-10 overflow-hidden rounded-2xl">
            {decideComponent(listingType, item)}
          </div>
        ))}
      </div>
      <div className="flex justify-center mx-auto ">
        <NavButton title="See more" link="/listings/shelters" />
      </div>
    </div>
  );
}

ListingsRowSection.propTypes = {
  title: PropTypes.string,
  listings: PropTypes.array,
  listingType: PropTypes.oneOf([SHELTER_TYPE, LOST_DOGS_TYPE]),
};

export default ListingsRowSection;
