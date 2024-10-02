import crypto from 'crypto'


class EncryptionLibrary {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.secret = process.env.SECRET_KEY || "yMDBdhcoXZKIElmHzkjdshadgaiDh83ya/jWAoHbL2dad"
        this.secretKey = crypto.createHash('sha256').update(this.secret).digest('base64').substring(0, 32);
        this.iv = (process.env.IV || "yMDBdhcoXZKIElmHzkjdshadgaiDh83ya").substring(0, 16)
        this.salt = (process.env.SALT || 'dguyuytuiioiuhdcvnm7698hjhsdh8nmfdkcmadDFHHtty').substring(0, 64)
        this.iterations = process.env.ITERATIONS || 2
    }

    encrypt(text) {
        let encryptedText = this.salt + text

        for (let i = 0; i < this.iterations; i++) {
            const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
            let encrypted = cipher.update(encryptedText, 'utf8', 'base64');
            encrypted += cipher.final('base64');
            encryptedText = encrypted
        }
        return encryptedText
    }

    decrypt(encryptedData) {

        let decryptedText = encryptedData
        for (let i = 0; i < this.iterations; i++) {
            const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, this.iv);
            let decrypted = decipher.update(decryptedText, 'base64', 'utf8');
            decrypted += decipher.final('utf8');
            decryptedText = decrypted
        }
        if(decryptedText.startsWith(this.salt)){
            decryptedText = decryptedText.slice(this.salt.length)
        }

        return decryptedText

    }

    commonFunction(inputObj, keys, isDecrypt) {
        for (let key in inputObj) {
            if (keys.includes(key) && typeof key === 'string') {
                if (isDecrypt) {
                    inputObj[key] = this.decrypt(String(inputObj[key]))
                } else {
                    inputObj[key] = this.encrypt(String(inputObj[key]))
                }
            } else {
                if (isDecrypt) {
                    this.decryptObjectKeys(inputObj[key], keys)
                } else {
                    this.encryptObjectKeys(inputObj[key], keys)
                }
            }
        }
        return inputObj
    }

    encryptObjectKeys(input, keys) {
        if (!keys || keys.length == 0) {
            return input
        }

        if (Array.isArray(input)) {
            input = input.map((eachObj) => {
                eachObj = this.commonFunction(eachObj, keys)
                return eachObj
            })

        } else if (typeof input === 'object') {

            input = this.commonFunction(input, keys)

        } else if (typeof input === 'string') {
            input = this.encrypt(String(input))

        } else {
            return input
        }
        return input

    }

    decryptObjectKeys(input, keys) {
        if (!keys || keys.length == 0) {
            return input
        }

        if (Array.isArray(input)) {
            input = input.map((eachObj) => {
                eachObj = this.commonFunction(eachObj, keys, true)
                return eachObj
            })

        } else if (typeof input === 'object') {

            input = this.commonFunction(input, keys, true)

        } else if (typeof input === 'string') {
            input = this.decrypt(String(input))

        } else {
            return input
        }
        return input
    }
}

const instance = new EncryptionLibrary()

const encryptObjectKeys = instance.encryptObjectKeys.bind(instance)
const decryptObjectKeys = instance.decryptObjectKeys.bind(instance)


export { encryptObjectKeys, decryptObjectKeys }
