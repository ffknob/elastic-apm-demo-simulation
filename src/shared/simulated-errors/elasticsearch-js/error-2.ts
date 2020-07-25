import { SimulatedError, SimulatedErrorFactory } from '../../../models';

const CATEGORY: string = 'elasticsearch-js';
const STATUS_CODE: number = 500;
const ERROR_MESSAGE: string = 'Invalid protocol: "file"';

export default class _ implements SimulatedErrorFactory {
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
