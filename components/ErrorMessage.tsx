import { ErrorMessage } from '@/types/Errors';
import React, { FC } from 'react';

const ErrorMessage: FC<ErrorMessage> = ({ errorMessage }) => {
  return (
    <div className="text-white p-2 bg-red-500/50 rounded-md text-center">
      {errorMessage}
    </div>
  );
};

export default ErrorMessage;
