exports.register = {
    firstName: {
      isString: { errorMessage: 'firstName is not a string' },
      exists: {
        errorMessage: 'firstName cannot be null',
        options: { checkFalsy: true },
      },
    },
    lastName: {
      isString: { errorMessage: 'lastName is not a string' },
      exists: {
        errorMessage: 'lastName cannot be null',
        options: { checkFalsy: true },
      },
    },
    email: {
      isEmail: { errorMessage: 'invalid email' },
      exists: {
        errorMessage: 'email cannot be null',
        options: { checkFalsy: true },
      },
      isString: { errorMessage: 'email is not a string' },
    },
    password: {
      isString: { errorMessage: 'password is not a string' },
      exists: {
        errorMessage: 'password cannot be null',
        options: { checkFalsy: true },
      },
      isStrongPassword: true,
      errorMessage: 'weak password',
    },
  }

exports.loginSchema = {
    email: {
        isEmail: { errorMessage: 'Invalid email' },
        exists: {
            errorMessage: 'Email cannot be null',
            options: { checkFalsy: true },
        },
        isString: { errorMessage: 'Email is not a string' },
    },
    password: {
        exists: {
            errorMessage: 'Password cannot be null',
            options: { checkFalsy: true },
        },
        isString: { errorMessage: 'Password is not a string' },
    },
}


exports.edit = {
  firstName: {
    isString: { errorMessage: 'firstName is not a string' },
    exists: {
      errorMessage: 'firstName cannot be null',
      options: { checkFalsy: true },
    },
  },
  lastName: {
    isString: { errorMessage: 'lastName is not a string' },
    exists: {
      errorMessage: 'lastName cannot be null',
      options: { checkFalsy: true },
    },
  },
  email: {
    isEmail: { errorMessage: 'invalid email' },
    exists: {
      errorMessage: 'email cannot be null',
      options: { checkFalsy: true },
    },
    isString: { errorMessage: 'email is not a string' },
  }
}