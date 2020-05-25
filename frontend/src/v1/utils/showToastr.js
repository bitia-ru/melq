const showToastr = (msg, options = { type: 'default' }) => {
  const duration = 5000;
  const lookUpTypes = {
    default: mdtoast.DEFAULT,
    error: mdtoast.ERROR,
    success: mdtoast.SUCCESS,
    warning: mdtoast.WARNING,
    info: mdtoast.INFO,
  };
  mdtoast(msg, { duration, type: lookUpTypes[options.type] });
  options.after && setTimeout(options.after, duration);
};

export default showToastr;
