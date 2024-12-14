import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PostPageSkeleton() {
  let theme = localStorage.getItem("theme");
  return (
    <div className="max-w-screen-md w-full mx-auto px-2 mt-5">
      <Skeleton
        highlightColor={`${theme == "dark" ? "#202020" : ""}`}
        baseColor={`${theme == "dark" ? "#121212" : ""}`}
      />
      <Skeleton
        highlightColor={`${theme == "dark" ? "#202020" : ""}`}
        baseColor={`${theme == "dark" ? "#121212" : ""}`}
        style={{ width: "75%" }}
      />
      <Skeleton
        highlightColor={`${theme == "dark" ? "#202020" : ""}`}
        baseColor={`${theme == "dark" ? "#121212" : ""}`}
        className="aspect-video w-full"
      />
      <Skeleton
        highlightColor={`${theme == "dark" ? "#202020" : ""}`}
        baseColor={`${theme == "dark" ? "#121212" : ""}`}
        style={{ width: "25%", height: "1.2rem" }}
        className="mt-4"
      />
      <Skeleton
        highlightColor={`${theme == "dark" ? "#202020" : ""}`}
        baseColor={`${theme == "dark" ? "#121212" : ""}`}
        style={{ width: "25%", height: "1.2rem" }}
        className="mt-4"
      />
      <Skeleton
        highlightColor={`${theme == "dark" ? "#202020" : ""}`}
        baseColor={`${theme == "dark" ? "#121212" : ""}`}
        className="my-7 h-1"
      />
      <Skeleton
        highlightColor={`${theme == "dark" ? "#202020" : ""}`}
        baseColor={`${theme == "dark" ? "#121212" : ""}`}
        count={5}
        className="h-3"
      />
    </div>
  );
}

export default PostPageSkeleton;
