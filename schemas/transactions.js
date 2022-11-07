exports.updateTransactionSchema = {
    userId: {
        exists: {
            errorMessage: 'UserId cannot be null',
            options: { checkFalsy: true }
        },
        isNumeric: { errorMessage: 'userId is not an Integer' }

    },
    amount: {
        exists: {
            errorMessage: 'amount cannot be null',
            options: { checkFalsy: true }
        },
        isDecimal: { errorMessage: 'amount must be a decimal' }

    },
    categoryId: {
        exists: {
            errorMessage: 'categoryId cannot be null',
            options: { checkFalsy: true }
        },
        isNumeric: { errorMessage: 'categoryId is not an Integer' }

    },
    date: {
        exists: {
            errorMessage: 'date cannot be null',
            options: { checkFalsy: true }
        },
        isDate: {
            errorMessage: 'date must be YYYY-MM-DD format',
            options: { format: 'YYYY-MM-DD' }
        }

    }
}
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