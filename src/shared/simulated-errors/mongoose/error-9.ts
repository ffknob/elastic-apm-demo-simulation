import { SimulatedError, SimulatedErrorFactory } from '../../../models';

const CATEGORY: string = 'mongoose';
const STATUS_CODE: number = 500;
const ERROR_MESSAGE: string =
  'Ran out of retries trying to reconnect to "mongodb://...". Try setting `server.reconnectTries` and `server.reconnectInterval` to something higher.';

export default class _ extends SimulatedErrorFactory {
  category: string = CATEGORY;

  generate = () => {
    const error: SimulatedError<any> = {
      name: 'Simulated Error: Mongoose',
      category: CATEGORY,
      code: STATUS_CODE,
      message: ERROR_MESSAGE,
    };

    return error;
  };
}
