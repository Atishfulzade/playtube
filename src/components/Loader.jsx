import React from "react";

const Loader = () => {
  return (
    <div class="flex justify-center items-center h-screen">
      <div class="flex flex-row gap-1">
        <div class="w-2 h-2 rounded-full bg-red-500 animate-bounce"></div>
        <div class="w-2 h-2 rounded-full bg-red-400 animate-bounce [animation-delay:-.3s]"></div>
        <div class="w-2 h-2 rounded-full bg-red-300 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
};

export default Loader;
