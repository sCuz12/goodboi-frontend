import React from "react";
import { Tag } from "antd";

function dogInfo({ dog, vaccinations }) {
  return (
    <div className="flex-col rounded-lg bg-roz">
      <div className="p-8">
        <div className="w-full">
          <p className="charectiristics_labels">
            Dog Name :{" "}
            <span className="charectiristics_values">{dog.name}</span>
          </p>
          <p className="charectiristics_labels">
            Age : <span className="charectiristics_values">{dog.age}</span>
          </p>
        </div>
        <p className="mr-5 text-roz h-5/5 border-x-2"></p>
        <div className="w-full"></div>

        <p className="charectiristics_labels">
          Vaccinations :
          <span className="ml-3 ">
            {vaccinations.map((vaccination) => (
              <Tag key={vaccination}>{vaccination}</Tag>
            ))}
          </span>
        </p>
        <p className="charectiristics_labels">
          Size :{" "}
          <span className="charectiristics_values">
            {dog.size.toUpperCase()}
          </span>
        </p>
      </div>
    </div>
  );
}

export default dogInfo;