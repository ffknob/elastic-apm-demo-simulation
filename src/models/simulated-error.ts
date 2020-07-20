import { GenericError } from '@ffknob/elastic-apm-demo-shared';

export default interface SimulatedError<T> extends GenericError<T> {}
