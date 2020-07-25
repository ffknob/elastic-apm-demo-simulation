import { SimulatedError } from '../models';
import { SimulatedErrorFactory } from '../models';
import SIMULATED_ERRORS from '../shared/simulated-errors/simulated-errors';

class ErrorGenerator {
  constructor() {}

  getRandomError<T = any>(category?: string): SimulatedError<T> {
    const errors = SIMULATED_ERRORS.filter((e) =>
      !category ? true : e.category === category
    );

    const randomErrorIndex: number = Math.floor(Math.random() * errors.length);
    const randomErrorGenerator: SimulatedErrorFactory =
      errors[randomErrorIndex];

    return randomErrorGenerator.generate();
  }
}

export default ErrorGenerator;
