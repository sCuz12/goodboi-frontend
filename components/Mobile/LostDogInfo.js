import React from "react";

function LostDogInfo({ dog }) {
  return (
    <div className="flex-col rounded-lg bg-roz">
      <div className="p-8">
        <div className="w-full">
          <p className="charectiristics_labels">
            Dog Name :{" "}
            <span className="charectiristics_values">{dog.name}</span>
          </p>
          <p className="charectiristics_labels">
            Lost Date :
            <span className="charectiristics_values">{dog.lost_date}</span>
          </p>
        </div>
        <p className="mr-5 text-roz h-5/5 border-x-2"></p>
        <div className="w-full"></div>

        <p className=" charectiristics_labels">
          City Lost :<span className="charectiristics_values"> {dog.city}</span>
        </p>
        {dog.reward && (
          <p className="charectiristics_labels">
            Reward:
            <span className=" charectiristics_values">€{dog.reward}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default LostDogInfo;
