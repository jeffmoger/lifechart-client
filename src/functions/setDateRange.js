import moment from 'moment';

export default function setDateRange(days){
    let end = moment().startOf('day');
    end.add(1, 'days');
    let start = moment().startOf('day');
    start.subtract(days, 'days');
    const rangeString = start.format('lll') + ' until ' + end.format('lll');
    const intStart = parseInt(start.format('x'), 10);
    const intEnd = parseInt(end.format('x'), 10);
    return [ intStart, intEnd, rangeString ]
}