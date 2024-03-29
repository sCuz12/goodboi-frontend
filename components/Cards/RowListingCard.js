import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
import { TiInputChecked } from "react-icons/ti";
import { Tooltip } from "antd";

function RowListingCard({
  item,
  index,
  handleDelete,
  handleAdopted,
  listingType,
}) {
  return (
    <div className="card card_row card_hoverable" key={item.id}>
      <div>
        <div className="image">
          <div className="aspect-w-4 aspect-h-3">
            <img src={item.cover_image} />
          </div>
        </div>
      </div>
      <div className="m-auto header ">
        <h5 className="text-lg">{item.name}</h5>
        <p>{item.description}</p>
        <div className="flex space-x-2">
          <BsEye size={20} /> <p>{item.total_views}</p>
        </div>
      </div>

      <div className="flex p-4 space-x-4 actions lg:flex-col lg:space-x-0 sm:space-x-4">
        <p>
          <a
            href={"/animals/view/" + item.id}
            className="pb-4 mt-auto text-black btn btn-icon btn_outlined btn_secondary ltr:ml-auto rtl:mr-auto lg:ltr:ml-0 lg:rtl:mr-0"
          >
            <MdPreview size={30} />
          </a>
        </p>
        {listingType == "active" && (
          <a
            href={"/shelter/listing/edit/" + item.id}
            className="pb-8 mt-auto text-black lg:pb-0 btn btn-icon btn_outlined btn_secondary ltr:ml-auto rtl:mr-auto lg:ltr:ml-0 lg:rtl:mr-0"
          >
            <Tooltip placement="top" title="Edit Listing">
              <AiFillEdit size={30} />
            </Tooltip>
          </a>
        )}

        <a
          onClick={() => handleDelete(index, item.id)}
          className="text-black btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0"
        >
          <Tooltip placement="top" title="Delete Listing">
            <AiFillDelete size={30} />
          </Tooltip>
        </a>
        {listingType === "active" && (
          <a
            onClick={() => handleAdopted(item.id)}
            className="text-black btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0"
          >
            <Tooltip placement="bottom" title="Mark as adopted">
              <TiInputChecked size={30} />
            </Tooltip>
          </a>
        )}
      </div>
    </div>
  );
}

export default RowListingCard;
