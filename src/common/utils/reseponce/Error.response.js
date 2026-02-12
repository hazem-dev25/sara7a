import {mood} from "../../../../config/env.service.js";
export const ErrorResponse = ({message = "Error", status = 400} = {}) => {
    throw new Error(message , {cause: {status}});
}

export const BadRequest = ({ message = "Bad Request"} = {}) => {
  return ErrorResponse({ message, status: 400});
}


export const NotFound = ({ message = "Not Found"} = {}) => {
  return ErrorResponse({ message, status: 404});
}


export const Conflict = ({ message = "Conflict"} = {}) => {
  return ErrorResponse({ message, status: 409});
}


export const forbidden = ({ message = "Forbidden"} = {}) => {
  return ErrorResponse({ message, status: 403});
}



export const unauthorized = ({ message = "Unauthorized"} = {}) => {
  return ErrorResponse({ message, status: 401});
}



export const globalErrorHandler = (error, req, res, next) => {
  const status =error.status || error.statusCode ||(error.cause ? error.cause.status : 500);
  const Mood = mood == "dev";
  const defaultMessage = "Something went wrong";
  const displayErrorMessage = error.message || defaultMessage;
  res.status(status).json({
    status,
    stack: Mood ? error.stack : null,
    errorMessage: Mood ? displayErrorMessage : defaultMessage,
  });
};
