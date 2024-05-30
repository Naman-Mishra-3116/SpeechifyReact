import React from "react";

const Button = ({ onCall, children, isListening }) => {
  return (
    <button
        disabled={isListening}
      onClick={onCall}
      className="p-4 rounded-md text-white  shadow-custom-white bg-slate-900 bg-opacity-35  hover:bg-red-600 hover:bg-opacity-25 w-60 uppercase hover:shadow-custom-black"
    >
      {children}
    </button>
  );
};

export default Button;
