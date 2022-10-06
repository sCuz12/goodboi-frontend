import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
function LostDogRowListing({ index, listing, handleDelete }) {
  return (
    <div className="card card_row card_hoverable" key={listing.id}>
      <div>
        <div className="image">
          <div className="aspect-w-4 aspect-h-3">
            <img src={listing.cover_image} />
          </div>
        </div>
      </div>
      <div className="m-auto header ">
        <h5 className="text-lg">{listing.title}</h5>
        <p>{listing.description}</p>
      </div>

      <div className="flex p-4 space-x-4 actions lg:flex-col lg:space-x-0 sm:space-x-4">
        <p>
          <a
            href={"/listings/lost-dogs/view/" + listing.id}
            className="pb-4 mt-auto text-black btn btn-icon btn_outlined btn_secondary ltr:ml-auto rtl:mr-auto lg:ltr:ml-0 lg:rtl:mr-0"
          >
            <MdPreview size={30} />
          </a>
        </p>

        <a
          href={"/shelter/listing/edit/" + listing.id}
          className="pb-8 mt-auto text-black lg:pb-0 btn btn-icon btn_outlined btn_secondary ltr:ml-auto rtl:mr-auto lg:ltr:ml-0 lg:rtl:mr-0"
        >
          <AiFillEdit size={30} />
        </a>

        <a
          onClick={() => handleDelete(index, listing.id)}
          className="text-black btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0"
        >
          <AiFillDelete size={30} />
        </a>
      </div>
    </div>
  );
}

export default LostDogRowListing;
