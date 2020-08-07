import { Request, Response, NextFunction } from 'express';

import {
    BackendSuccess,
    BackendError,
    SimulationResponseResult
} from '@ffknob/elastic-apm-demo-shared';

import Simulation from '../services/simulation';
import SimulationRequestLocals from '../shared/interfaces/simulation-request-locals';

const sendSuccess = (
    statusCode: number,
    statusMessage: string,
    simulationRequestLocals: SimulationRequestLocals,
    res: Response
) => {
    const simulationResponseResult: SimulationResponseResult = {
        success: true
    };

    const backendSuccess: BackendSuccess<SimulationResponseResult> = {
        id: simulationRequestLocals.id,
        success: true,
        statusCode: statusCode,
        statusMessage: statusMessage,
        metadata: simulationRequestLocals.metadata,
        data: simulationResponseResult
    };

    res.status(statusCode).json(backendSuccess);
};

const generateSuccess = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const simulationRequestLocals: SimulationRequestLocals =
        res.locals.simulationRequest;
    const simulation: Simulation = new Simulation();

    await simulation.generateSuccess(simulationRequestLocals);

    sendSuccess(200, 'Success', simulationRequestLocals, res);
};

const generateThrownError = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const simulationRequestLocals: SimulationRequestLocals =
        res.locals.simulationRequest;
    const simulation: Simulation = new Simulation();

    try {
        await simulation.generateThrownError(simulationRequestLocals);
    } catch (err) {
        next(err);
    }
};

const generateCapturedError = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const simulationRequestLocals: SimulationRequestLocals =
        res.locals.simulationRequest;
    const simulation: Simulation = new Simulation();

    await simulation.generateCapturedError(simulationRequestLocals);

    sendSuccess(200, 'Error Captured', simulationRequestLocals, res);
};

const generateComplexTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const simulationRequestLocals: SimulationRequestLocals =
        res.locals.simulationRequest;
    const simulation: Simulation = new Simulation();

    await simulation.generateComplexTransaction(simulationRequestLocals);

    sendSuccess(200, 'Complex Transaction', simulationRequestLocals, res);
};

const generateDistributedTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    generateSuccess;
    const simulationRequestLocals: SimulationRequestLocals =
        res.locals.simulationRequest;
    const simulation: Simulation = new Simulation();

    await simulation.generateDistributedTransaction(simulationRequestLocals);

    sendSuccess(200, 'Distributed Transaction', simulationRequestLocals, res);
};

export default {
    generateSuccess,
    generateThrownError,
    generateCapturedError,
    generateComplexTransaction,
    generateDistributedTransaction
};
