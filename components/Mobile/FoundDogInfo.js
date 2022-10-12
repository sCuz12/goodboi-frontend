import React from "react";

function FoundDogInfo({ dog }) {
  return (
    <div className="flex-col rounded-lg bg-roz">
      <div className="p-8">
        <div className="w-full">
          <p className="charectiristics_labels">
            Dog Name :{" "}
            <span className="charectiristics_values">{dog.name}</span>
          </p>
          <p className="charectiristics_labels">
            Found Date :
            <span className="charectiristics_values">{dog.found_date}</span>
          </p>
        </div>
        <p className="mr-5 text-roz h-5/5 border-x-2"></p>
        <div className="w-full"></div>

        <p className=" charectiristics_labels">
          City Found :
          <span className="charectiristics_values"> {dog.city}</span>
        </p>
      </div>
    </div>
  );
}

export default FoundDogInfo;
