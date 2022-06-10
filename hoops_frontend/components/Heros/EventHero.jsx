import React from "react";

function EventHero({ img_url }) {
  const style = {
    backgroundImage: img_url ? `url(${img_url})` : `url(/basketball-court.svg)`,
  };
  return (
    <div className="hero h-80 lg:h-96" style={style}>
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold"></h1>
        </div>
      </div>
    </div>
  );
}

export default EventHero;
