const Loading = ({ overlay = true }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        overlay ? "bg-black bg-opacity-50" : ""
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg text-lg font-semibold flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        Loading...
      </div>
    </div>
  );
};

export default Loading;
