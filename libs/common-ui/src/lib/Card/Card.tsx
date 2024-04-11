import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const Card = ({ children }: Props) => {
  return (
    <li className="flex flex-col justify-start items-center gap-2 rounded-lg shadow-lg p-4">
      {children}
    </li>
  );
};
