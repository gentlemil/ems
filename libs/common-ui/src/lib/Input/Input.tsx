import React from 'react';
import { FieldError } from 'react-hook-form';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
} from 'react';
import { classMerge } from '../utils/cn';

type Props = {
  label: string;
  error?: FieldError;
} & ComponentPropsWithRef<'input'>;

export const Input = forwardRef(
  (
    { label, error, className, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="my-2">
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <input
          id={label}
          ref={ref}
          className={classMerge(
            'block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ems-blue sm:text-sm sm:leading-6',
            className
          )}
          {...rest}
        />
        {error && (
          <p className="py-1 italic text-sm text-red-500">{error.message}</p>
        )}
      </div>
    );
  }
);
