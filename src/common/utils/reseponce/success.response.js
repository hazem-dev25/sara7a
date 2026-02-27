export const success = ({res, data = null, message = "Done", status = 200} = {}) => {
  return res.status(status).json({
    success: true,
    message,
    data ,
  });
};
