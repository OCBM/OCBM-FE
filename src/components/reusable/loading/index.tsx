const Loading = () => {
  return (
    <>
      {/* <span className="absolute w-[30px] h-[30px] bg-white rotate-45 top-[-15px] left-[95px]"></span> */}
      <div className="flex gap-4">
        <div className="mb-5 px-2 rounded-2xl shadow-2xl w-[160px] h-[178px] flex flex-col items-center justify-between">
          <div className="flex animate-pulse flex-col items-center h-full justify-center p-3">
            <div className="w-full bg-gray-300 h-[80%]  "></div>
            <div className="flex flex-col items-center  py-2">
              <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
            </div>
          </div>
        </div>
        <div className="mb-5 px-2 rounded-2xl shadow-2xl w-[160px] h-[178px] flex flex-col items-center justify-between">
          <div className="flex animate-pulse flex-col items-center h-full justify-center p-3">
            <div className="w-full bg-gray-300 h-[80%]  "></div>
            <div className="flex flex-col items-center  py-2">
              <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
            </div>
          </div>
        </div>
        <div className="mb-5 px-2 rounded-2xl shadow-2xl w-[160px] h-[178px] flex flex-col items-center justify-between">
          <div className="flex animate-pulse flex-col items-center h-full justify-center p-3">
            <div className="w-full bg-gray-300 h-[80%]  "></div>
            <div className="flex flex-col items-center  py-2">
              <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
