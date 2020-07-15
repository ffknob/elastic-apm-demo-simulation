import { Request, Response, NextFunction } from 'express';

import { SimulationRequest } from '@ffknob/elastic-apm-demo-shared';

import logger from '../services/logger';

import SimulationRequestLocals from '../shared/interfaces/simulation-request-locals';

const requestParser = (req: Request, res: Response, next: NextFunction) => {
    const simulationParameters = req.body.parameters;
    const simulationOptions = req.body.options;

    const { id } = req.body.id;
    const { maxRandomDelay } = simulationParameters;
    const {
        randomUserContext,
        userContext,
        randomCustomContext,
        customContext,
        randomLabels,
        labels,
        complexTransaction,
        distributedTransaction
    } = simulationOptions;

    const simulationRequestLocals: SimulationRequestLocals = {
        id,
        maxRandomDelay,
        randomUserContext,
        userContext,
        randomCustomContext,
        customContext,
        randomLabels,
        labels,
        complexTransaction,
        distributedTransaction
    };

    logger.debug(simulationRequest);

    res.locals.simulationRequest = simulationRequest;

    next();
};

export default { requestParser };
