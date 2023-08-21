import moment from 'moment';

export const toFormatTime = (date: Date) => moment(date).format('HH:mm:ss');
