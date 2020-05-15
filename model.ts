import * as t from 'io-ts/lib';
import { log } from 'fp-ts/lib/Console'
import { pipe } from 'fp-ts/lib/pipeable'
import { IO } from 'fp-ts/lib/IO';

// define user model (2 required, 1 optional)
export const User = t.intersection([t.type({
    username: t.string,
    first_name: t.string,
}), t.partial({
    last_name: t.string,
})]);

// get typeof user model
export type User = t.TypeOf<typeof User>;

// convert User object to String
export function toString(user: User): string {
    return `Username: ${user.username}, First name: ${user.first_name} Last name:${user.last_name}\n`;
}

// log to console
export function logUser(user: User): IO<void> {
    return pipe(user, toString, log);
};
