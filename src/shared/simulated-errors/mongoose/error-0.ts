import { SimulatedError, SimulatedErrorFactory } from '../../../models';

const CATEGORY: string = 'mongoose';
const STATUS_CODE: number = 500;
const ERROR_MESSAGE: string =
    'No document found for query "foo" on model "bar"';

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
