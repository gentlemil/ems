import React from 'react';
import { classMerge } from '../utils/cn';

type Props = {
  children: React.ReactNode;
  ratio?: 'square' | 'video' | 'auto';
};

export const Card = ({ children, ratio = 'auto' }: Props) => {
  const buildClassName = (aspect: string) => {
    return classMerge(
      'flex flex-col justify-start items-center gap-2 rounded-lg shadow-xl p-4',
      {
        'aspect-square': aspect === 'square',
        'aspect-video': aspect === 'video',
        'aspect-auto': aspect === 'auto',
      }
    );
  };
  return <li className={buildClassName(ratio)}>{children}</li>;
};
