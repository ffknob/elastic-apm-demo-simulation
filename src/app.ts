import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';

import {
    ApmService,
    SimulationResponseError,
    BackendError
} from '@ffknob/elastic-apm-demo-shared';

import simulationRoutes from './routes/simulation';
import { SimulatedError } from './models';

const apmService = ApmService.getInstance();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/*const BackgroundTask = require('./services/background-task');
let backgroundTaskId = 1;
setInterval(() => {
console.log(`Background task #${backgroundTaskId}`);
    let backgroundTask = new BackgroundTask();
    let userContext = { random: true };

    backgroundTask.execute(`Background task #${backgroundTaskId}`, 'task', 5, 10000, userContext);
    backgroundTaskId += 1;
}, 50000);*/

app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}}',
        expressFormat: true,
        colorize: false
    })
);

app.use(
    expressWinston.errorLogger({
        transports: [new winston.transports.Console()]
    })
);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'POST, GET, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use('/', simulationRoutes);

app.use(
    (
        err: SimulatedError<any>,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        apmService.captureError(err.message!);

        const simulationResponseError: SimulationResponseError<any> = {
            success: false,
            errors: [err]
        };

        const backendError: BackendError<SimulationResponseError<
            SimulatedError<any>
        >> = {
            id: res.locals.id,
            success: false,
            statusCode: err.code ? +err.code : 500,
            statusMessage: err.message || 'Internal Server Error',
            metadata: res.locals.metadata,
            data: simulationResponseError
        };

        res.status(err.code ? +err.code : 500).json(backendError);
    }
);

const PORT: Number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
