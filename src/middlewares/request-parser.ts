import { Request, Response, NextFunction } from 'express';

import {
  Request as _Request,
  SimulationRequest,
} from '@ffknob/elastic-apm-demo-shared';

import logger from '../services/logger';

import SimulationRequestLocals from '../shared/interfaces/simulation-request-locals';

const requestParser = (req: Request, res: Response, next: NextFunction) => {
  const simulationParameters = req.body.parameters;
  const simulationOptions = req.body.options;

  const id: _Request<SimulationRequest>['id'] = req.body.id;
  const { maxRandomDelay } = simulationParameters;
  const {
    randomUserContext,
    userContext,
    randomCustomContext,
    customContext,
    randomLabels,
    labels,
    complexTransaction,
    distributedTransaction,
  } = simulationOptions;

  const simulationRequestLocals: Partial<SimulationRequestLocals> = {
    id,
    maxRandomDelay,
    randomUserContext,
    userContext,
    randomCustomContext,
    customContext,
    randomLabels,
    labels,
    complexTransaction,
    distributedTransaction,
  };

  logger.debug(simulationRequestLocals);

  res.locals.simulationRequest = simulationRequestLocals;

  next();
};

export default { requestParser };
