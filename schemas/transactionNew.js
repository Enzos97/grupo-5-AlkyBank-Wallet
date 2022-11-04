exports.newTransaction = {
    description: {
      isString: { errorMessage: 'description must be a string' },
      exists: {
        errorMessage: 'you must add a description',
        options: { checkFalsy: true },
      },
    },
    amount: {
      isDecimal: { errorMessage: 'amount must be a number' },
      exists: {
        errorMessage: 'amount cannot be null',
        options: { checkFalsy: true },
      },
    },
    userId: {
      isInt: { errorMessage: 'userId must be a integer' },
      exists: {
        errorMessage: 'userId cannot be null',
        options: { checkFalsy: true },
      },
    },
    categoryId: {
        isInt: { errorMessage: 'categoryId must be a integer' },
        exists: {
          errorMessage: 'categoryId cannot be null',
          options: { checkFalsy: true },
        },
    },
  }