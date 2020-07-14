import { Request, Response, NextFunction } from 'express';

import {
    SimulationRequest,
    SimulationResponse
} from '@ffknob/elastic-apm-demo-shared';

import Simulation from '../services/simulation';
import SimulationRequestLocals from '../shared/interfaces/simulation-request-locals';

const generateSuccess = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const simulationRequest: SimulationRequestLocals =
        res.locals.simulationRequest;
    const simulation: Simulation = new Simulation();

    await simulation.generateSuccess(simulationRequest);

    const simulationResponse: SimulationResponse = {
        success: true,
        metadata: res.locals.metadata
    };

    res.status(200).json(simulationResponse);
};

const generateThrownError = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const simulationRequest: SimulationRequestLocals =
        res.locals.simulationRequest;
    const simulation: Simulation = new Simulation();

    try {
        await simulation.generateThrownError(simulationRequest);
    } catch (err) {
        next(err);
    }
};

const generateCapturedError = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const simulationRequest: SimulationRequestLocals =
        res.locals.simulationRequest;
    const simulation: Simulation = new Simulation();

    await simulation.generateCapturedError(simulationRequest);
};

const generateComplexTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const simulationRequest: SimulationRequestLocals =
        res.locals.simulationRequest;
    const simulation: Simulation = new Simulation();

    await simulation.generateComplexTransaction(simulationRequest);

    res.status(200).send();
};

const generateDistributedTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    generateSuccess;
    const simulationRequest: SimulationRequestLocals =
        res.locals.simulationRequest;
    const simulation: Simulation = new Simulation();

    await simulation.generateDistributedTransaction(simulationRequest);

    res.status(200).send();
};

export default {
    generateSuccess,
    generateThrownError,
    generateCapturedError,
    generateComplexTransaction,
    generateDistributedTransaction
};
