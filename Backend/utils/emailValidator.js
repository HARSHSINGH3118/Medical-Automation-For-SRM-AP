// utils/emailValidator.js
export const validateEmail = (email) => {
  const domain = email.split("@")[1];
  return domain === "srmap.edu.in";
};
