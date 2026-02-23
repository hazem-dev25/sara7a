import {mood} from "../../../../config/env.service.js";
export const ErrorResponse = ({message = "Error", status = 400 , extra = undefined} = {}) => {
    throw new Error(message , {cause: {status , extra}});
}

export const BadRequest = ({ message = "Bad Request" , extra = undefined} = {}) => {
  return ErrorResponse({ message, status: 400 , extra});
}


export const NotFound = ({ message = "Not Found" ,extra = undefined} = {}) => {
  return ErrorResponse({ message, status: 404 , extra});
}


export const Conflict = ({ message = "Conflict" , extra = undefined} = {}) => {
  return ErrorResponse({ message, status: 409 ,extra});
}


export const forbidden = ({ message = "Forbidden" , extra = undefined} = {}) => {
  return ErrorResponse({ message, status: 403 , extra});
}



export const unauthorized = ({ message = "Unauthorized" , extra = undefined} = {}) => {
  return ErrorResponse({ message, status: 401 , extra});
}



export const globalErrorHandler = (error, req, res, next) => {
  const status =error.status || error.statusCode ||(error.cause ? error.cause.status : 500);
  const Mood = mood == "dev";
  const defaultMessage = "Something went wrong";
  const displayErrorMessage = error.message || defaultMessage;
  const extra = error.extra || {}
  res.status(status).json({
    status,
    stack: Mood ? error.stack : null,
    errorMessage: Mood ? displayErrorMessage : defaultMessage,
    extra: error.cause?.extra || null
  });
};
