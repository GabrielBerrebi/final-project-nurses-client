import {Status} from '../../models/enums/Status';

export function getStatusCode(status: Status) {
    let color: string = 'blue';
    (status === Status.PENDING) && (color = 'orange');
    (status === Status.STARTED) && (color = 'blue');
    (status === Status.DONE) && (color = 'green');
    return color;
}
