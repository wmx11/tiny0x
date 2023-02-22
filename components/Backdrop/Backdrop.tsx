import React from 'react';

export const OrangeBackdrop = () => {
  return (
    <>
      <div className="absolute p-24 w-[900px] h-[900px] bg-orange-700 blur-[250px] opacity-80 rounded-full top-[-250px] left-[-250px]"></div>
      <div className="absolute p-24 w-[750px] h-[750px] bg-orange-600 blur-[100px] opacity-70 rounded-full bottom-[-200px] left-[500px]"></div>
      <div className="absolute p-24 w-[800px] h-[800px] bg-orange-500 blur-[150px] opacity-80 rounded-full right-[-400px] top-[100px]"></div>
    </>
  );
};

export const YellowBackdrop = () => {
  return (
    <>
      <div className="absolute p-24 w-[900px] h-[900px] bg-yellow-500 blur-[250px] opacity-80 rounded-full top-[-250px] left-[-250px]"></div>
      <div className="absolute p-24 w-[750px] h-[750px] bg-yellow-400 blur-[100px] opacity-70 rounded-full bottom-[-200px] left-[500px]"></div>
      <div className="absolute p-24 w-[800px] h-[800px] bg-yellow-300 blur-[150px] opacity-60 rounded-full right-[-400px] top-[100px]"></div>
    </>
  );
};
