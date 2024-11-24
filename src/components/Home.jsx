import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="max-w-screen-md mx-auto px-2">
      {/* No post page start */}
      <div className="flex flex-col items-center justify-center h-[90vh] text-center">
        <h2 className="text-2xl font-bold text-gray-800">No Posts Yet!</h2>
        <p className="text-gray-500 mt-2">
          It looks like there are no posts at the moment.
        </p>
        <button className="btn-primary my-4">
          <Link to="/create-post">Create a Post</Link>
        </button>
      </div>
      {/* No post page end */}
    </main>
  );
}

export default Home;
