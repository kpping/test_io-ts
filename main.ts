import { User, logUser } from "./model";
import { logError } from "./utils";
import { fold } from "fp-ts/lib/Either";

const notUser1 = User.decode({
});
fold(logError, logUser)(notUser1)();

const notUser2 = User.decode({
    username: 1,
    first_name: 2,
    last_name: 3,
});
fold(logError, logUser)(notUser2)();

const notUser3 = User.decode({
    last_name: '3',
});
fold(logError, logUser)(notUser3)();

const captain = User.decode({
    username: 'captain',
    first_name: 'Steve',
});
fold(logError, logUser)(captain)();

const ironman = User.decode({
    username: 'ironman',
    first_name: 'Tony',
    last_name: 'Stark'
});
fold(logError, logUser)(ironman)();
