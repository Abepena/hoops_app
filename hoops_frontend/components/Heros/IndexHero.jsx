import Link from "next/link";

function IndexHero({ title, subtitle, imgURL, buttonText }) {
  const style = {
    backgroundImage: `url(/pickup-game.jpg)`,
  };
  return (
    <div className="relative hero min-h-screen" style={style}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-7xl md:text-8xl font-extrabold uppercase">
            Game On
          </h1>
          <p className="mb-5 text-xl md:text-3xl font-semibold">
            Lace up and find yourself a game.
          </p>
          <div className="text-center">
            <Link href="/events">
              <a>
                <button className="btn btn-success">Discover Events</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute  w-full h-40 bottom-0 right-0 bg-gradient-to-t from-base-100"></div>
    </div>
  );
}

export default IndexHero;
