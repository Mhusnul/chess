import React from "react";
import profile from "../../assets/chess-player.jpg";
import board from "../../assets/chess-board.png";

function Aboute() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white p-4">
      <div className="bg-[#393E46]/30 backdrop-blur-sm shadow-md p-4 rounded-xl">
        <h2 className="text-5xl font-bold tracking-wider uppercase bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-lg">
          ABOUTE
        </h2>
        <h3 className="text-3xl mt-5 font-medium tracking-wide text-gray-100 drop-shadow-md">
          Muhamad Husnul Maad
        </h3>
        <div className="flex gap-5 mt-3 italic font-light text-justify">
          <p className="leading-relaxed text-gray-200/90 tracking-wide">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
            voluptate alias nemo dolorem aliquid, provident error? Inventore
            exercitationem praesentium necessitatibus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
          </p>
          <p className="leading-relaxed text-gray-200/90 tracking-wide">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
            deleniti recusandae non accusantium maiores labore dolorem excepturi
            itaque deserunt. Quasi! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptas fugiat earum in consequatur, tenetur,
            saepe nisi.
          </p>
        </div>
      </div>
      <div className="h-96 bg-white/30 backdrop-blur-sm rounded-xl overflow-hidden">
        <img
          src={profile}
          alt="profile"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}

export default Aboute;
