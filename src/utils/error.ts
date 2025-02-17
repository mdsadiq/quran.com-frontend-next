import { BaseResponse } from 'types/APIResponses';

// eslint-disable-next-line import/prefer-default-export
export const throwIfError = (res: BaseResponse) => {
  if (res.status === 500) {
    throw new Error('internal server error');
  }
};
