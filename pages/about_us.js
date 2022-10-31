import React from "react";

function about_us() {
  return (
    <div>
      <main className="pt-20">
        <section className="flex flex-col items-center justify-center flex-1 w-full px-20 pt-10 text-center ">
          <div className="flex justify-center max-w-4xl mb-10 shadow-2xl sm:w-2/2 lg:w-1/2 h-98 rounded-2xl bg-navyPink sm:w-full">
            <div className="w-2/4">
              <h2 className="pt-10 pb-5 text-2xl font-bold text-basicFont font-kdam">
                About us
              </h2>
              <p className="text-lg">
                People who are looking to adapt a dog, had to visit the shelters
                around just to have a look at the available dogs! Not only that,
                but many beautiful dogs are sitting around in multiple shelter
                and a person is very hard to see them all at once. Goodboi wants
                to connect all the local dog shelters with people looking to
                adapot a dog! We understand that some people prefer to just buy
                a dog, but we aim to at least provide the opportunity to the
                dogs in shelter to be seen! You never know, you might just see
                your next best friend sit here!
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default about_us;
