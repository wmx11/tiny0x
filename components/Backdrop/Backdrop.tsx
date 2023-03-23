import React from 'react';

type BackdropTypes = {
  animate?: boolean;
};

export const OrangeBackdrop = ({ animate }: BackdropTypes) => {
  return (
    <>
      <div
        className={`absolute p-24 w-[900px] h-[900px] bg-orange-700 blur-[250px] opacity-80 rounded-full top-[-250px] left-[-250px] ${
          animate ? 'backdrop-animate' : ''
        }`}
      ></div>
      <div
        className={`absolute p-24 w-[750px] h-[750px] bg-orange-600 blur-[100px] opacity-70 rounded-full bottom-[-200px] left-[500px] ${
          animate ? 'backdrop-animate' : ''
        }`}
      ></div>
      <div
        className={`absolute p-24 w-[800px] h-[800px] bg-orange-500 blur-[150px] opacity-80 rounded-full right-[-400px] top-[100px] ${
          animate ? 'backdrop-animate' : ''
        }`}
      ></div>
    </>
  );
};

export const YellowBackdrop = ({ animate }: BackdropTypes) => {
  return (
    <>
      <div
        className={`absolute p-24 w-[900px] h-[900px] bg-yellow-500 blur-[250px] opacity-80 rounded-full top-[-250px] left-[-250px] ${
          animate ? 'backdrop-animate' : ''
        }`}
      ></div>
      <div
        className={`absolute p-24 w-[750px] h-[750px] bg-yellow-400 blur-[100px] opacity-70 rounded-full bottom-[-200px] left-[500px] ${
          animate ? 'backdrop-animate' : ''
        }`}
      ></div>
      <div
        className={`absolute p-24 w-[800px] h-[800px] bg-yellow-300 blur-[150px] opacity-60 rounded-full right-[-400px] top-[100px] ${
          animate ? 'backdrop-animate' : ''
        }`}
      ></div>
    </>
  );
};

export const PinkBackdrop = ({ animate }: BackdropTypes) => {
  return (
    <>
      <div
        className={`absolute p-24 w-[900px] h-[900px] bg-pink-500 blur-[250px] opacity-80 rounded-full top-[-250px] left-[-250px] ${
          animate ? 'backdrop-animate' : ''
        }`}
      ></div>
      <div
        className={`absolute p-24 w-[750px] h-[750px] bg-pink-400 blur-[100px] opacity-70 rounded-full bottom-[-200px] left-[500px] ${
          animate ? 'backdrop-animate' : ''
        }`}
      ></div>
      <div
        className={`absolute p-24 w-[800px] h-[800px] bg-pink-300 blur-[150px] opacity-60 rounded-full right-[-400px] top-[100px] ${
          animate ? 'backdrop-animate' : ''
        }`}
      ></div>
    </>
  );
};
