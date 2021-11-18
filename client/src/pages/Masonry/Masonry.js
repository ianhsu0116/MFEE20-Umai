import React from "react";
import Gallery from "./Gallery";
import ReactReadMoreReadLess from "react-read-more-read-less";

const longText = "read more";
const Masonry = () => {
  return (
    <div>
      <Gallery />
      <ReactReadMoreReadLess
        charLimit={100}
        readMoreText={"Read more ▼"}
        readLessText={"Read less ▲"}
      >
        {longText}
      </ReactReadMoreReadLess>
    </div>
  );
};

export default Masonry;
