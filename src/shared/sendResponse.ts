import { Response } from 'express';

type IData<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    totalPage: number;
    total: number;
  };
  data?: T;
};

const sendResponse = <T>(res: Response, data: IData<T>) => {
  const resData = {
    success: data.success,
    message: data.message,
    pagination: data.pagination,
    data: data.data,
  };
  res.status(data.statusCode).json(resData);
};

export default sendResponse;
