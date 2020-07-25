import axios from 'axios';
import uuid from 'uuid';

import {
    ApmService,
    SimulationRequest,
    APMLabel,
    Transaction,
    Span,
    SimulationUserContext
} from '@ffknob/elastic-apm-demo-shared';

import SPAN_TYPES from '@ffknob/elastic-apm-demo-shared';

import { randomNumber } from '../shared/util';

import DelayGenerator from './delay-generator';
import ErrorGenerator from './error-generator';
import LabelGenerator from './label-generator';

import { SimulationRequestLocals } from '../shared/interfaces';
import { SimulatedError } from '../models';

class Simulation {
    constructor() {}

    createUserContext(simulationRequest: SimulationRequestLocals) {
        const userContext = simulationRequest.userContext;

        if (userContext) {
            return {
                random: simulationRequest.randomUserContext,
                id: userContext.id,
                username: userContext.username,
                email: userContext.email
            };
        } else {
            return { random: true };
        }
    }

    async init(
        simulationRequest: SimulationRequestLocals,
        delayOnInit: boolean
    ) {
        const apmService = ApmService.getInstance();
        const delayGenerator = new DelayGenerator();

        const userContext: SimulationUserContext = this.createUserContext(
            simulationRequest
        );
        apmService.setUserContext(userContext);

        if (simulationRequest.randomLabels) {
            const labelGenerator = new LabelGenerator();
            const label = labelGenerator.getRandomLabel();
            apmService.setLabel(label.name, label.value);
        } else {
            if (simulationRequest.labels) {
                simulationRequest.labels.forEach((label: APMLabel) =>
                    apmService.setLabel(label.key, label.value)
                );
            }
        }

        if (delayOnInit) {
            await delayGenerator
                .randomDelay(simulationRequest.maxRandomDelay)
                .then((delay: number) =>
                    apmService.setLabel('random-delay', delay)
                );
        }
    }

    async generateSuccess(simulationRequest: SimulationRequestLocals) {
        await this.init(simulationRequest, true);
    }

    async generateThrownError(simulationRequest: SimulationRequestLocals) {
        await this.init(simulationRequest, true);

        const errorGenerator = new ErrorGenerator();
        throw errorGenerator.getRandomError();
    }

    async generateCapturedError(simulationRequest: SimulationRequestLocals) {
        const apmService = ApmService.getInstance();

        await this.init(simulationRequest, true);

        const errorGenerator: ErrorGenerator = new ErrorGenerator();
        const error: SimulatedError<any> = errorGenerator.getRandomError<any>();

        apmService.captureError(error, {
            handled: false,
            custom: {
                fake: true,
                category: error.category,
                code: error.code
            }
        });
    }

    async generateComplexTransaction(
        simulationRequest: SimulationRequestLocals
    ) {
        const apmService: ApmService = ApmService.getInstance();
        const delayGenerator: DelayGenerator = new DelayGenerator();

        const complexTransaction: SimulationRequest['complexTransaction'] =
            simulationRequest.complexTransaction;
        const traceparent = apmService.getCurrentTraceparent();

        await this.init(simulationRequest, false);

        for (let i = 0; i < complexTransaction!.totalSubTransactions; i++) {
            let subTransactionName: string = `Sub-transaction #${i}`;
            let subTransactionType: string = 'custom';
            let subTransactionId: string = uuid.v4().split('-')[0];
            let subTransaction: Transaction | null;

            subTransaction = apmService.startTransaction(
                `${subTransactionName} (${subTransactionId})`,
                subTransactionType,
                { childOf: traceparent! }
            );

            for (let j = 0; j < complexTransaction!.totalSpans; j++) {
                let randomSpanTypeIndex = randomNumber(SPAN_TYPES.length);

                let span: Span | null = subTransaction!.startSpan(
                    `Span #${i}.${j}`,
                    SPAN_TYPES[randomSpanTypeIndex]
                );

                await delayGenerator.randomDelay(
                    simulationRequest.maxRandomDelay
                );

                if (span) span.end();

                await delayGenerator.randomDelay(
                    simulationRequest.maxRandomDelay
                );
            }

            if (subTransaction) subTransaction.end();
        }
    }

    async generateDistributedTransaction(simulationRequest) {
        const datasets = ['users', 'todos', 'comments', 'albuns', 'photos'];
        const randomIndex = Math.floor(Math.random() * datasets.length);
        const fetchAndSaveEndpoint = `http://external-service:3000/api/${datasets[randomIndex]}/fetch`;

        await this.init(simulationRequest, false);

        return await axios.get(fetchAndSaveEndpoint);
    }
}

export default Simulation;
