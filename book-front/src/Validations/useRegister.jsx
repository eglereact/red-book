import { useState } from "react";

const useRegister = () => {
  const [errors, setErrors] = useState({});

  const setServerErrors = (err) => {
    setErrors(err);
  };

  const validate = (form) => {
    const errorsBag = {};

    if (form.name.length <= 3) {
      errorsBag.name = "Name is too short. Min length is 3.";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      errorsBag.email = "Email format is not correct.";
    }
    if (form.password.length <= 8) {
      errorsBag.password = "Password is too shot. Minimum 8 symbols.";
    } else if (!/[0-9]/.test(form.password)) {
      errorsBag.password = "Password must contain a number.";
    } else if (!/[a-z]/.test(form.password)) {
      errorsBag.password = "Password must contain a small letter.";
    } else if (!/[A-Z]/.test(form.password)) {
      errorsBag.password = "Password must contain a capital letter.";
    }

    if (form.password !== form.password2 && !errorsBag.password) {
      errorsBag.password2 = "Passwords don't match.";
    }
    return true;
    if (Object.keys(errorsBag).length === 0) {
      setErrors({});
      return true;
    }
    setErrors(errorsBag);
    return false;
  };

  return { errors, validate, setServerErrors };
};

export default useRegister;
