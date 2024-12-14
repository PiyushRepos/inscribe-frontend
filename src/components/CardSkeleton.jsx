import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardSkeleton({ count }) {
  let theme = localStorage.getItem("theme");
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <div key={index}>
        <Skeleton
          baseColor={`${theme == "dark" ? "#121212" : ""}`}
          highlightColor={`${theme == "dark" ? "#202020" : ""}`}
          className="h-[13rem]"
        />
        <Skeleton
          baseColor={`${theme == "dark" ? "#121212" : ""}`}
          highlightColor={`${theme == "dark" ? "#202020" : ""}`}
          className="h-5 mt-3"
        />
        <Skeleton
          baseColor={`${theme == "dark" ? "#121212" : ""}`}
          highlightColor={`${theme == "dark" ? "#202020" : ""}`}
          className="h-5 mt-2"
        />
        <Skeleton
          baseColor={`${theme == "dark" ? "#121212" : ""}`}
          highlightColor={`${theme == "dark" ? "#202020" : ""}`}
          className="h-3 mt-4"
        />
        <Skeleton
          baseColor={`${theme == "dark" ? "#121212" : ""}`}
          highlightColor={`${theme == "dark" ? "#202020" : ""}`}
          className="h-3"
        />
        <Skeleton
          baseColor={`${theme == "dark" ? "#121212" : ""}`}
          highlightColor={`${theme == "dark" ? "#202020" : ""}`}
          className="h-3"
          style={{ width: "50%" }}
        />
        <Skeleton
          baseColor={`${theme == "dark" ? "#121212" : ""}`}
          highlightColor={`${theme == "dark" ? "#202020" : ""}`}
          className="h-3 mt-2"
          style={{ width: "5rem" }}
        />
        <Skeleton
          baseColor={`${theme == "dark" ? "#121212" : ""}`}
          highlightColor={`${theme == "dark" ? "#202020" : ""}`}
          className="h-3 mt-2"
          style={{ width: "7rem" }}
        />
      </div>
    ));
}

export default CardSkeleton;
