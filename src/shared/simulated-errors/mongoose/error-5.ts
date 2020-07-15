import SimulatedError from '../../../models/simulated-error';
import SimulatedErrorFactory from '../../../models/simulated-error-factory';

const CATEGORY: string = 'mongoose';
const STATUS_CODE: number = 500;
const ERROR_MESSAGE: string =
    'The document you tried to `save()` was not found.';

export default class _ extends SimulatedErrorFactory {
    category: string = CATEGORY;

    generate = () => {
        const error: SimulatedError = {
            name: 'Simulated Error: Mongoose',
            category: CATEGORY,
            code: STATUS_CODE,
            message: ERROR_MESSAGE
        };

        return error;
    };
}
