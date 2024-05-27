import crypto from 'crypto';

class Utility {
    static randomString(length) {
        return crypto.randomBytes(length).toString('hex').substring(0, length);
    }

    static randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export default Utility;