import uuid from 'uuid';
const Fakerator = require('fakerator');

import { SimulationUserContext } from '@ffknob/elastic-apm-demo-shared';

const randomNumber = (max: number): number => Math.floor(Math.random() * max);

const randomUserContext = (): SimulationUserContext => {
    const fakerator = Fakerator();

    const id: string | number = uuid.v4();
    const firstName: string = fakerator.names.firstName();
    const lastName: string = fakerator.names.lastName();
    const username: string = fakerator.internet.userName(firstName, lastName);
    const email: string = fakerator.internet.email(firstName, lastName);

    const userContext: SimulationUserContext = {
        random: true,
        id,
        firstName,
        lastName,
        username,
        email
    };

    return userContext;
};

export { randomNumber, randomUserContext };
