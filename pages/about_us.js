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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur laoreet non eros a tincidunt. Pellentesque dictum at
                tellus non fermentum. Ut vitae justo et magna condimentum
                scelerisque. Pellentesque aliquet tempor odio in auctor. Aenean
                facilisis lectus ut sagittis porta. Pellentesque placerat justo
                et vestibulum tempus. Maecenas luctus enim nisi, non egestas
                neque condimentum congue. Sed posuere est et dictum rhoncus.
                Vivamus consectetur libero lorem. Cras non scelerisque erat.
                Phasellus at orci nec urna cursus accumsan in in mauris. Duis
                quis dolor malesuada dolor tempor consectetur. Pellentesque non
                luctus ipsum. Cras at lorem ultrices, posuere lorem a, pulvinar
                ipsum.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default about_us;
