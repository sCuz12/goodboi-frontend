import React from "react";

function RectGuides({ text_one, text_two, text_three }) {
  const elements_show = [
    {
      text: text_one,
      color: "bg-roz",
      number: 1,
    },
    {
      text: text_two,
      color: "bg-lightPink",
      number: 2,
    },
    {
      text: text_three,
      color: "bg-lightBlue",
      number: 3,
    },
  ];

  return (
    <div className="lg:flex sm:flex sm:w-full">
      {elements_show.map((element, i) => (
        <>
          <div className={`h-40  w-60 rounded-2xl ${element.color}`}>
            <div className="h-1/2">
              <h1 className="text-7xl font-cherryBomb text-darkPurple">
                {element.number}
              </h1>
            </div>
            <p className="flex justify-center font-bold nav_link_text">
              {element.text}
            </p>
          </div>
          {i != 2 && (
            <div className="flex">
              <span class=" h-1 w-full bg-green-600 lg:w-1/3 pt-14">____</span>
            </div>
          )}
        </>
      ))}
    </div>
  );
}

export default RectGuides;
