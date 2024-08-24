import abt from "../media/About.png";
import b2 from "../media/community-line 1.png";
import b3 from "../media/stack-line 1.png";
import b4 from "../media/plant-line 1.png";
import b5 from "../media/shield-star-line 1.png";
import b6 from "../media/eye-2-line 1.png";

// Array of card data
const cardData = [
  { icon: b2, text: "Pay As Little As Possible!" },
  { icon: b3, text: "Enjoy Wisdom Of Community" },
  { icon: b4, text: "Let Somebody Else Take Care Of Landlord!" },
  { icon: b5, text: "Enjoy Peaceful Environment!" },
  { icon: b6, text: "Stay Safe! Save Money!" },
  { icon: b2, text: "Pay For What You Use!" },
];

const HeroAbout = () => {
  return (
    <div className="p-0 m-0 w-full">
      <div className="flex flex-col items-center px-8 pt-12">
        <h3 className="text-center text-2xl font-bold leading-tight max-w-2xl">
          Minimum Living Cost Takes Care Of Everything
        </h3>
      </div>
      <div
        className="flex flex-wrap justify-center"
        style={{ paddingLeft: "2%", paddingRight: "2%" }}
      >
        {/* Left Image Section */}
        <div className="w-full sm:w-1/3 p-4 flex justify-center">
          <div className=" border border-gray-200/0 rounded-lg shadow-transparent overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl flex items-center justify-center">
            <img src={abt} alt="About" className="w-full h-auto" />
          </div>
        </div>

        {/* Right Text and Icon Section */}
        <div className="w-full sm:w-2/3 p-2 flex flex-col justify-items-center">
          <div className="flex flex-wrap justify-center my-auto">
            {/* Individual Cards */}
            {cardData.map((card, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 p-4 flex justify-center"
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:scale-105 hover:shadow-2xl transform transition-transform shadow-lg flex flex-col items-center p-6 h-auto max-w-[250px]">
                  {/* Card Icon/Badge */}
                  <div className="bg-white w-16 h-16 flex items-center justify-center border border-gray-300 rounded-full shadow-md mb-4">
                    <img src={card.icon} alt="Icon" className="w-8 h-8" />
                  </div>
                  {/* Card Text */}
                  <p className="text-center text-base font-semibold text-gray-800 flex-grow flex items-center justify-center px-2">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Repeat the card structure for other cards
            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
              <div className="border-0 flex flex-col items-center">
                <div className="bg-white w-15 h-15 flex items-center justify-center border border-black">
                  <img src={b2} alt="Icon" className="w-full h-auto" />
                </div>
                <p className="text-center mt-4 text-base">
                  Enjoy Wisdom Of community
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
              <div className="border-0 flex flex-col items-center">
                <div className="bg-white w-15 h-15 flex items-center justify-center border border-black">
                  <img src={b3} alt="Icon" className="w-full h-auto" />
                </div>
                <p className="text-center mt-4 text-base">
                  Let Somebody Else Take Care Of Landlord!
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
              <div className="border-0 flex flex-col items-center">
                <div className="bg-white w-15 h-15 flex items-center justify-center border border-black">
                  <img src={b4} alt="Icon" className="w-full h-auto" />
                </div>
                <p className="text-center mt-4 text-base">
                  Enjoy Peaceful Environment!
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
              <div className="border-0 flex flex-col items-center">
                <div className="bg-white w-15 h-15 flex items-center justify-center border border-black">
                  <img src={b5} alt="Icon" className="w-full h-auto" />
                </div>
                <p className="text-center mt-4 text-base">
                  Stay Safe! Save Money!
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
              <div className="border-0 flex flex-col items-center">
                <div className="bg-white w-15 h-15 flex items-center justify-center border border-black">
                  <img src={b6} alt="Icon" className="w-full h-auto" />
                </div>
                <p className="text-center mt-4 text-base">
                  Pay For What You Use!
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAbout;
