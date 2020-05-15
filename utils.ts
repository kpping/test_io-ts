import * as t from 'io-ts/lib';
import { error } from 'fp-ts/lib/Console'
import { pipe } from 'fp-ts/lib/pipeable'
import { last } from 'fp-ts/lib/Array';
import { getOrElse, map } from 'fp-ts/lib/Option';
import { IO } from 'fp-ts/lib/IO';
import { isNil } from '@ag1/nil';

// get incorrect propery path
export function getPropPath(context: t.Context): string {
    return context.map((c) => c.key).filter(Boolean).join('.');
}

// get expected value
export function getExpected(context: t.Context): string {
    return pipe(Array.from(context), last, map((c) => c.type.name), getOrElse(() => 'any'));
}

// if val is not nil, put it in bracket
export function formatActualValue(val: unknown): string {
    if (isNil(val)) {
        return `${val}`;
    }

    return `${typeof val}(${val})`;
}

// convert Error list to String
export function toString(errors: t.Errors): string {
    return errors.map((e) => `Invalid prop: ${getPropPath(e.context)}\t>> Expected: ${getExpected(e.context)} <> Actual: ${formatActualValue(e.value)}`).join('\n') + '\n';
};

// log to console
export function logError(errors: t.Errors): IO<void> {
    return pipe(errors, toString, error);
};
