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