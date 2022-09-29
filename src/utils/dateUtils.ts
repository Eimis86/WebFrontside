const millisecondsInDay = 60 * 60 * 24 * 1000;

export const MonthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const MonthNameShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const WeekDay = ['sunday', 'monday' ,'tuesday' ,'wednesday' ,'thursday', 'friday' ,'saturday'];
export const WeekDayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getTodayDate = (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

//Date only, without time
export const getClearDate = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

//Time only (ms from midnight)
export const getTimeFromMidnight = (date: Date): number => {
    return date.getTime() - getClearDate(date).getTime();
};

export const shiftDate = (
    date: Date,
    shift: {year?: number;  month?: number; day?: number; hour?: number; minutes?: number; seconds?: number;}
): Date => {
    return new Date(
        date.getFullYear() + (shift.year ?? 0),
        date.getMonth() + (shift.month ?? 0),
        date.getDate() + (shift.day ?? 0),
        date.getHours() + (shift.hour ?? 0),
        date.getMinutes() + (shift.minutes ?? 0),
        date.getSeconds() + (shift.seconds ?? 0),
        date.getMilliseconds()
    );
};

//current date + days
export const getNextDate = (days?: number): Date => {
    if (!days) {
        return getTodayDate();
    }

    return shiftDate(getTodayDate(), {day: days});
};

function getDaysTotal(d: Date) {
    return Math.floor((d.getTime()) / millisecondsInDay);
}

export function firstDayOfYear(date: Date) {
    return new Date(date.getFullYear(), 0, 1);
}

export const decodeDate = (date: Date) => {
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        dayOfMonth: date.getDate(),
        dayOfWeek: date.getDay(),
        daysTotal: getDaysTotal(date),
        daysFromToday: getDaysTotal(date) - getDaysTotal(getTodayDate()),
    };
};

export const decodeDateTime = (date: Date) => {
    return {
        ...decodeDate(date),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        second: date.getSeconds()
    };
};

export function isStrValidDate(dateStr: string) {
    return new Date(dateStr).toString() !== 'Invalid Date';
}
