import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* You can replace this with your preferred loading spinner or animation */}
      <div className="border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full h-12 w-12 animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
};

export default Loading;
