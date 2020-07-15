import SimulatedError from '../../../models/simulated-error';
import SimulatedErrorFactory from '../../../models/simulated-error-factory';

const CATEGORY: string = 'mongoose';
const STATUS_CODE: number = 500;
const ERROR_MESSAGE: string =
    'You attempted to `save()` an array that was modified after you loaded it with a `$elemMatch` or similar projection.';

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
