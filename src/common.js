const crypto = require('crypto')

class EncryptionLibrary {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.secretKey = (process.env.SECRET_KEY ? process.env.SECRET_KEY + 'dfjgkhjljhfdgfhghjgsdgfhjdgfhcbv987' : "yMDBdhcoXZKIElmHzkjdshadgaiDh83yajWAoHbL2dadhjgglgkjlg").substring(0, 32);
        this.iv = (process.env.IV ? process.env.IV + "JHKJDGIFsdhkjbdbfagidkjdfld" : "yMDBdhcoXZKIElmHzkjdshadgaiDh83ya").substring(0, 16);
        this.salt = (process.env.SALT || 'dguyuytuiioiuhdcvnm7698hjhsdh8nmfdkcmadDFHHtty').substring(0, 64);
        this.iterations = parseInt(process.env.ITERATIONS || '2');
    }

    #encrypt(text) {
        let encryptedText = Buffer.from(this.salt + text, 'utf8');

        for (let i = 0; i < this.iterations; i++) {
            const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
            encryptedText = Buffer.concat([cipher.update(encryptedText), cipher.final()]);
        }
        return encryptedText.toString('base64');  // Base64 encode the final result
    }

    #decrypt(encryptedData) {
        let decryptedText = Buffer.from(encryptedData, 'base64');

        for (let i = 0; i < this.iterations; i++) {
            const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, this.iv);
            decryptedText = Buffer.concat([decipher.update(decryptedText), decipher.final()]);
        }

        // Convert decrypted Buffer back to string
        let decryptedString = decryptedText.toString('utf8');

        // Remove the salt
        if (decryptedString.startsWith(this.salt)) {
            decryptedString = decryptedString.slice(this.salt.length);
        }

        return decryptedString;
    }

    #commonFunction(inputObj, keys, isDecrypt) {
        for (let key in inputObj) {
            if (keys.includes(key) && typeof inputObj[key] === 'string') {
                if (isDecrypt) {
                    inputObj[key] = this.#decrypt(String(inputObj[key]));
                } else {
                    inputObj[key] = this.#encrypt(String(inputObj[key]));
                }
            } else {
                if (isDecrypt) {
                    this.decryptObjectKeys(inputObj[key], keys);
                } else {
                    this.encryptObjectKeys(inputObj[key], keys);
                }
            }
        }
        return inputObj;
    }

    encryptObjectKeys(input, keys) {
        if (!keys || keys.length === 0) {
            return input;
        }

        if (Array.isArray(input)) {
            return input.map((eachObj) => this.#commonFunction(eachObj, keys, false));
        } else if (typeof input === 'object') {
            return this.#commonFunction(input, keys, false);
        } else if (typeof input === 'string') {
            return this.#encrypt(String(input));
        }
        return input;
    }

    decryptObjectKeys(input, keys) {
        if (!keys || keys.length === 0) {
            return input;
        }

        if (Array.isArray(input)) {
            return input.map((eachObj) => this.#commonFunction(eachObj, keys, true));
        } else if (typeof input === 'object') {
            return this.#commonFunction(input, keys, true);
        } else if (typeof input === 'string') {
            return this.#decrypt(String(input));
        }
        return input;
    }
}


module.exports = { EncryptionLibrary }