import React from "react";
import { Videos } from "../components";
import { useParams } from "react-router-dom";
const SearchFeed = () => {
  const { searchTerm } = useParams();
  return (
    <div className="md:ps-5">
      <h4 className="md:my-2 m-2 font-semibold text-slate-700 whitespace-nowrap text-xl">
        Search result for: <span className="text-red-600">{searchTerm}</span>
      </h4>
      <Videos isHorizantal={true} />
    </div>
  );
};

export default SearchFeed;
