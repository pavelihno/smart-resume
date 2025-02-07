import mongoose from 'mongoose';
import { param, validationResult } from 'express-validator';

import { badRequestError } from './errors.js';


export const validateRequest = (validators) => {
    return async (req, res, next) => {
        await Promise.all(validators.map((validator) => validator.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
        } else {
            return badRequestError(res, errors.array());
        }
    };
}

const validateObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ID');
    }
    return true;
};

export const objectIdValidator = [
    param('id')
        .custom(validateObjectId)
];