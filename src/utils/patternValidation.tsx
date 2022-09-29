const emailPattern = /^.+@.+$/i;
// format: 'word123@word.word'

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d?!@#%^&*()\-+=~`{}[\]|'":;,.<>]{8,}$/i;
// format: 'word123!@#%^&*()\-+=~`{}[]\|'":;,.<>'

const namePattern = /^[0-9\w]+$/i;
// format: 'word123_'

const patternValidation = (value: string, pattern: RegExp ) => {
    const str = value.match(pattern);

    if(str !== null && str.toString() === value) {
        return value;
    } else {
        return '';
    }
};

export { emailPattern, passwordPattern, namePattern, patternValidation };