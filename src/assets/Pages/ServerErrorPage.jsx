import React from 'react';
import Lottie from 'lottie-react';
import PageNotFound from '../data/PageNotFound.json';

function ServerErrorPage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white text-center h-screen overflow-hidden">
      <div className="w-full max-w-md">
        <Lottie animationData={PageNotFound} loop={true} />
      </div>
      <button
        onClick={handleRetry}
        className="mt-6 px-6 py-2 text-sm font-medium border border-gray-400 text-gray-700 rounded hover:bg-gray-100 transition duration-200"
      >
        Retry
      </button>
    </div>
  );
}

export default ServerErrorPage;
