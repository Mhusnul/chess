import React from "react";
import profile from "../../assets/profile.png";
import board from "../../assets/chess-board.png";

function Aboute() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white ">
      <div className="bg-[#393E46]/30 backdrop-blur-sm shadow-md p-4  rounded-xl">
        <h2>About</h2>
        <h3 className="text-3xl font-light mt-5">Muhamad Husnul Maad</h3>
        <div className="flex gap-2 mt-3 italic font-light">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
            voluptate alias nemo dolorem aliquid, provident error? Inventore
            exercitationem praesentium necessitatibus.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
            deleniti recusandae non accusantium maiores labore dolorem excepturi
            itaque deserunt. Quasi!
          </p>
        </div>
      </div>
      <div
        className="h-96"
        style={{
          backgroundImage: `url(${board})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img src={profile} alt="profile" className="h-full mx-auto" />
      </div>
    </div>
  );
}

export default Aboute;
