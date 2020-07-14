import { SimulationRequest } from '@ffknob/elastic-apm-demo-shared';

export default interface SimulationRequestLocals {
    maxRandomDelay: SimulationRequest['parameters']['maxRandomDelay'];
    randomUserContext: SimulationRequest['options']['randomUserContext'];
    userContext: SimulationRequest['options']['userContext'];
    randomCustomContext: SimulationRequest['options']['randomCustomContext'];
    customContext: SimulationRequest['options']['customContext'];
    randomLabels: SimulationRequest['options']['randomLabels'];
    labels: SimulationRequest['options']['labels'];
    complexTransaction: SimulationRequest['complexTransaction'];
    distributedTransaction: SimulationRequest['distributedTransaction'];
}
