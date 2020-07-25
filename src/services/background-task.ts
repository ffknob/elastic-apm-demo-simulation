import uuid from 'uuid';

import { ApmService, SPAN_TYPES } from '@ffknob/elastic-apm-demo-shared';

import { randomNumber } from '../shared/util';

import DelayGenerator from './delay-generator';

class BackgroundTask {
  constructor() {}

  async execute(
    transactionName,
    transactionType,
    totalSpans,
    maxRandomDelay,
    userContext
  ) {
    const apmService = ApmService.getInstance();
    const delayGenerator: DelayGenerator = new DelayGenerator();

    const transactionId: String = uuid.v4().split('-')[0];
    const transaction = apmService.startTransaction(
      `${transactionName} (${transactionId})`,
      transactionType
    );

    apmService.setUserContext(userContext);

    for (let i = 0; i < totalSpans; i++) {
      let randomSpanTypeIndex = randomNumber(SPAN_TYPES.length);
      let span = apmService.startSpan(
        `Span #${i}`,
        SPAN_TYPES[randomSpanTypeIndex]
      );

      await delayGenerator.randomDelay(maxRandomDelay);

      if (span) span.end();

      await delayGenerator.randomDelay(maxRandomDelay);
    }

    if (transaction) transaction.end();
  }
}

export default BackgroundTask;
