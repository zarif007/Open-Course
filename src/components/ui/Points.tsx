import React from 'react';
import { BiCoinStack } from 'react-icons/bi';

const Points = ({ points }: { points: number }) => {
  return (
    <div className="flex space-x-2 justify-center items-center rounded bg-rose-500 px-4 py-1 font-semibold">
      <p>{points}</p>
      <BiCoinStack />
    </div>
  );
};

export default Points;
