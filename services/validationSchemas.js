const BuyerSignupValidationSchema = () => {
  return {
    username: {
      in: ["body"],
      errorMessage: "Username is required !",
      isString: true,
      toLowerCase: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 30 },
        errorMessage:
          "Username must be longer than 3 characters and smaller than 30 characters",
      },
    },
    email: {
      in: ["body"],
      exists: {
        errorMessage: "Email is required !",
        bail: true,
      },
      isEmail: {
        errorMessage: "Invalid Email Address !",
        bail: true,
      },
      toLowerCase: true,
      trim: true,
    },
    first_name: {
      in: ["body"],
      errorMessage: "First name is required !",
      isString: true,
      trim: true,
      toLowerCase: true,
      isLength: {
        options: { min: 3, max: 30 },
        errorMessage:
          "First name must be longer than 3 characters and smaller than 30 characters",
      },
    },
    last_name: {
      in: ["body"],
      errorMessage: "Last name is required !",
      isString: true,
      trim: true,
      toLowerCase: true,
      isLength: {
        options: { min: 3, max: 30 },
        errorMessage:
          "Last name must be longer than 3 characters and smaller than 30 characters",
      },
    },
    password: {
      in: ["body"],
      errorMessage: "Last name is required !",
      isString: true,
      trim: true,
      isLength: {
        options: { min: 4, max: 16 },
        errorMessage:
          "Password must be longer than 3 characters and smaller than 30 characters",
      },
    },
  };
};

const BuyerSigninValidationSchema = () => {
  return {
    username: {
      in: ["body"],
      errorMessage: "Username is required !",
      isString: true,
      toLowerCase: true,
      trim: true,
    },
    password: {
      in: ["body"],
      errorMessage: "Password is required !",
      isString: true,
    }
  };
};

module.exports = {
  BuyerSignupValidationSchema,
  BuyerSigninValidationSchema,
};
