import { SimulatedError, SimulatedErrorFactory } from '../../../models';

const CATEGORY: string = 'http';
const STATUS_CODE: number = 428;
const ERROR_MESSAGE: string = 'Precondition Required';

export default class _ extends SimulatedErrorFactory {
    category: string = CATEGORY;

    generate = () => {
        const error: SimulatedError<any> = {
            name: 'Simulated Error: HTTP',
            category: CATEGORY,
            code: STATUS_CODE,
            message: ERROR_MESSAGE
        };

        return error;
    };
}
