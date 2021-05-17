export const validateRequiredFields = (fields) => {
  const errors = [];

  Object.keys(fields).forEach((key) => {
    if (!fields[key]) {
      errors.push(`${key}: value is required`);
    }
  });
  return errors;
};

export const validateEmail = (email) => {
  const errors = [];

  if (!email) {
    errors.push(`email: value is required`);
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.push("email: value is not valid");
  }
  return errors;
};
