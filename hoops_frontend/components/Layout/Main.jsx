import React, { useState, useEffect } from "react";
import LargeCard from "./LargeCard";
import MediumCard from "./MediumCard";
import SmallCard from "components/Cards/SmallCard";
import useHorizontalScroll from "/utils/useSideScroll";

const training_categories = [
  { img: "pickup-game.jpg", title: "Open gym runs & Pick up games" },
  { img: "dunk.jpg", title: "Open seminars & practices" },
  { img: "color-court.jpg", title: "Rec League Sign Ups" },
  { img: "training.jpg", title: "Training Programs" },
  { img: "mens-leagues.jpg", title: "Men's Leagues" },
  { img: "womens-basketball.jpg", title: "Coed Leagues" },
];

const court_img = "/basketball_court.svg";


function Main({ upcomingEvents }) {
  const scrollRef = useHorizontalScroll();

  return (
    <div className="relative -mt-10 w-11/12 container mx-auto">
      <div className="mx-3 p-6 relative rounded-lg shadow-2xl bg-base-200 mb-8">
        <h2 className="font-semibold text-3xl border-b-2 border-neutral-content pb-4">
          Upcoming events
        </h2>
        <section className="pt-4 grid items-center justify-center md:grid-cols-2  xl:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <SmallCard key={index} event={event} />
          ))}
        </section>
      </div>
      <section className="mb-6">
        <h2 className="text-3xl px-4 pb-4 font-semibold border-b-2 border-neutral-content  ">
          Explore it all
        </h2>
        <div
          ref={scrollRef}
          className="flex space-x-3 overflow-scroll scrollbar-hide p-4 scroll-touch"
        >
          {training_categories.map((category, index) => {
            return (
              <MediumCard
                key={index}
                img={category.img}
                title={category.title}
              />
            );
          })}
        </div>
      </section>
      <LargeCard img="/lazy-basketball.jpg" />
    </div>
  );
}

export default Main;
