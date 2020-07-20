import { Request, Response, NextFunction } from 'express';

import {
    BackendSuccess,
    BackendError,
    SimulationResponseResult
} from '@ffknob/elastic-apm-demo-shared';

import Simulation from '../services/simulation';
import SimulationRequestLocals from '../shared/interfaces/simulation-request-locals';

const sendSuccess = (
    simulationRequestLocals: SimulationRequestLocals,
    res: Response
) => {
    const simulationResponseResult: SimulationResponseResult = {
        success: true
    };

    const backendSuccess: BackendSuccess<SimulationResponseResult> = {
        id: simulationRequestLocals.id,
        success: true,
        statusCode: 200,
        statusMessage: 'OK',
        metadata: simulationRequestLocals.metadata,
        data: simulationResponseResult
    };

    res.status(200).json(backendSuccess);
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

    sendSuccess(simulationRequestLocals, res);
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

    sendSuccess(simulationRequestLocals, res);
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

    sendSuccess(simulationRequestLocals, res);
};

export default {
    generateSuccess,
    generateThrownError,
    generateCapturedError,
    generateComplexTransaction,
    generateDistributedTransaction
};
