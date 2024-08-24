import React from "react";

export const Button = (props) => {
  return (
    <button className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-violet-500 to-purple-700 shadow-[0px_0px_12px_white]">
      {/* Decorative layers */}
      <div className="absolute inset-0">
        {/* Top border with gradient mask */}
        <div className="border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        {/* Bottom border with gradient mask */}
        <div className="border border-white/40 absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
        {/* Inset shadow */}
        <div className="absolute inset-0 shadow-[0_0_10px_rgb(140,69,255,0.7)_inset]"></div>
      </div>
      {/* Button text */}
      <span className="text-white">{props.children}</span>
    </button>
  );
};
