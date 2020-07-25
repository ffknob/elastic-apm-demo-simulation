import { SimulatedError, SimulatedErrorFactory } from '../../../models';

const CATEGORY: string = 'elasticsearch-js';
const STATUS_CODE: number = 500;
const ERROR_MESSAGE: string = 'There are not living connections';

export default class _ extends SimulatedErrorFactory {
  category: string = CATEGORY;

  generate = () => {
    const error: SimulatedError<any> = {
      name: 'Simulated Error: Elasticsearch',
      category: CATEGORY,
      code: STATUS_CODE,
      message: ERROR_MESSAGE,
    };

    return error;
  };
}
