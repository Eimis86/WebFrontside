import React, {useMemo, useRef} from 'react';
import styles from './styles.scss';

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | '_';

export interface PinCodeProps {
    readonly size: number;
    readonly value?: string;
    readonly onChange?: (value: string) => void;
}

const SpecialChar = '_';

function strToDigit(char?: string) {
    if (char && char.length > 0) {
        switch (char[char.length - 1]) {
            case '0': return 0;
            case '1': return 1;
            case '2': return 2;
            case '3': return 3;
            case '4': return 4;
            case '5': return 5;
            case '6': return 6;
            case '7': return 7;
            case '8': return 8;
            case '9': return 9;
        }
    }

    return SpecialChar;
}

function replaceDigit(data: Digit[], newDigit: Digit, pos: number) {
    const newData = [...data];
    newData[pos] = newDigit;

    return newData;
}

export const PinCode: React.FC<PinCodeProps> = ({size, value, onChange}) => {
    // const data
    const data: Digit[] = useMemo(
        () => new Array(size).fill(undefined).map((_, idx) => strToDigit(value?.[idx])),
        [size, value]
    );

    const refs = data.map(_ => useRef<HTMLInputElement>(null));

    const processKeyDown = (e: React.KeyboardEvent, idx: number) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
            return;
        }

        if ('0123456789'.indexOf(e.key) >= 0) {
            onChange && onChange(replaceDigit(data, strToDigit(e.key), idx).join(''));
            if (idx < size - 1) {
                refs[idx + 1].current?.focus();
            }
        }

        if (e.key === 'Backspace') {
            onChange && onChange(replaceDigit(data, SpecialChar, idx).join(''));

            if (idx > 0) {
                refs[idx - 1].current?.focus();
            }
        }

        if ((e.key === 'ArrowLeft') && (idx > 0)) {
            refs[idx - 1].current?.focus();
        }

        if ((e.key === 'ArrowRight') && (idx < size - 1)) {
            refs[idx + 1].current?.focus();
        }

        e.preventDefault();
    };

    return (
        <div className={styles.pinCode}>
            {data.map((digit, idx) => (
                <input
                    key={idx}
                    ref={refs[idx]}
                    type='text'
                    className={styles.digitInput}
                    value={digit === SpecialChar ? '' : digit}
                    pattern='[0-9]'
                    inputMode='numeric'
                    placeholder='0'
                    // onInput={(e: ChangeEvent<HTMLInputElement>) => onChange(replaceDigit(data, strToDigit(e.target.value), idx).join(''))}
                    onChange={() => {}}
                    onKeyDown={(e) => processKeyDown(e, idx) }
                />
            ))}
        </div>
    );
};
