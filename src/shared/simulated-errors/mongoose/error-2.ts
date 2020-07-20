import { SimulatedError, SimulatedErrorFactory } from '../../../models';

const CATEGORY: string = 'mongoose';
const STATUS_CODE: number = 500;
const ERROR_MESSAGE: string =
    'This connection timed out in trying to reconnect to MongoDB and will not successfully reconnect to MongoDB unless you explicitly reconnect.';

export default class _ extends SimulatedErrorFactory {
    category: string = CATEGORY;

    generate = () => {
        const error: SimulatedError<any> = {
            name: 'Simulated Error: Mongoose',
            category: CATEGORY,
            code: STATUS_CODE,
            message: ERROR_MESSAGE
        };

        return error;
    };
}
