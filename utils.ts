import * as t from 'io-ts/lib';
import { error } from 'fp-ts/lib/Console'
import { pipe } from 'fp-ts/lib/pipeable'
import { last } from 'fp-ts/lib/Array';
import { getOrElse, map } from 'fp-ts/lib/Option';
import { IO } from 'fp-ts/lib/IO';

// get incorrect propery path
export function getPropPath(context: t.Context): string {
    return context.map((c) => c.key).filter(Boolean).join('.');
}

// get expected value
export function getExpected(context: t.Context): string {
    return pipe(Array.from(context), last, map((c) => c.type.name), getOrElse(() => 'any'));
}

// convert Error object to String
export function toString(errors: t.Errors): string {
    return errors.map((e) => `Invalid prop: ${getPropPath(e.context)}\t>> Expected: ${getExpected(e.context)} != Actual: ${String(e.value)}`).join('\n') + '\n';
};

// log to console
export function logError(errors: t.Errors): IO<void> {
    return pipe(errors, toString, error);
};
