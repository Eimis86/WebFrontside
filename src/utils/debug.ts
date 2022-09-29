type LogLevel = 'none' | 'error' | 'warning' | 'info' | 'debug' | 'trace';

const allowedLogLevel = {
    'none': [''],
    'error': ['error'],
    'warning': ['error', 'warning'],
    'info': ['error', 'warning', 'info'],
    'debug': ['error', 'warning', 'info', 'debug'],
    'trace': ['error', 'warning', 'info', 'debug', 'trace']
};

const logLevel = 'debug';
// eslint-disable-next-line no-console
const _consoleLog = console.log;

function _log(level: LogLevel, ...data: unknown[]) {
    if (logLevel && allowedLogLevel[logLevel].includes(level)) {
        _consoleLog(...data);
    }
}

export const log = {
    Error: (...data: unknown[]): void => _log('error', ...data),
    Warn: (...data: unknown[]): void => _log('warning', ...data),
    Info: (...data: unknown[]): void => _log('info', ...data),
    Debug: (...data: unknown[]): void => _log('debug', ...data),
    Trace: (...data: unknown[]): void => _log('trace', ...data),
};

// eslint-disable-next-line no-console
console.log = () => log.Trace;
