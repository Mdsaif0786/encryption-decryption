
#  Encryption-Decryption Library for Object , Array of Object,Key and String

**encryption-decryption** is a Node.js library that provides easy-to-use functions for encrypting and decrypting specific keys within objects, arrays, and strings. The library supports both CommonJS and ES6 module formats.

## Features

- Encrypt and decrypt specific keys within an object or array.
- Supports string encryption and decryption.
- Simple API with easy integration into existing Node.js projects.

## Installation

To install the package, use npm:

```bash
npm install encryption-decryption-easy
```

## Usage

You can use this library with both ES6 modules and CommonJS.

### ES6 Module Example

```javascript
import {EncryptionLibrary} from 'encryption-decryption-easy';

// ENV keys = SECRET_KEY, ITERATIONS, IV, SALT

const instance = new EncryptionLibrary()

// Encrypt object keys
const inputObject = { name: 'John Doe', ssn: '123-45-6789' };
const encryptedObject = instance.encryptObjectKeys(inputObject, ['ssn']);
console.log('Encrypted Object:', encryptedObject);

// Decrypt object keys
const decryptedObject = instance.decryptObjectKeys(encryptedObject, ['ssn']);
console.log('Decrypted Object:', decryptedObject);


// Encrypt Array of object keys
const inputArrayOfObject = [{ name: 'John Doe', ssn: '123-45-6789' }];
const encryptedArrayOfObject = instance.encryptObjectKeys(inputArrayOfObject, ['ssn']);
console.log('Encrypted Object:', encryptedArrayOfObject);

// Decrypt Array of object keys
const decryptedArrayOfObject = instance.decryptObjectKeys(encryptedArrayOfObject, ['ssn']);
console.log('Decrypted Object:', decryptedArrayOfObject);

// Encrypt String

const inputString = "myPassword"
const encryptedPassword = instance.encryptObjectKeys(inputString, ['inputString'])

console.log('Encrypted string:', encryptedPassword);


const decryptedPassword = instance.encryptObjectKeys(encryptedPassword, ['encryptedPassword'])

console.log('Decrypted string:', decryptedPassword);


```

### CommonJS Module Example

```javascript
import {EncryptionLibrary}  = require('encryption-decryption-easy');

// ENV keys = SECRET_KEY, ITERATIONS, IV, SALT

const instance = new EncryptionLibrary()

// Encrypt object keys
const inputObject = { name: 'John Doe', ssn: '123-45-6789' };
const encryptedObject = instance.encryptObjectKeys(inputObject, ['ssn']);
console.log('Encrypted Object:', encryptedObject);

// Decrypt object keys
const decryptedObject = instance.decryptObjectKeys(encryptedObject, ['ssn']);
console.log('Decrypted Object:', decryptedObject);


// Encrypt Array of object keys
const inputArrayOfObject = [{ name: 'John Doe', ssn: '123-45-6789' }];
const encryptedArrayOfObject = instance.encryptObjectKeys(inputArrayOfObject, ['ssn']);
console.log('Encrypted Object:', encryptedArrayOfObject);

// Decrypt Array of object keys
const decryptedArrayOfObject = instance.decryptObjectKeys(encryptedArrayOfObject, ['ssn']);
console.log('Decrypted Object:', decryptedArrayOfObject);

// Encrypt String

const inputString = "myPassword"
const encryptedPassword = instance.encryptObjectKeys(inputString, ['inputString'])

console.log('Encrypted string:', encryptedPassword);


const decryptedPassword = instance.encryptObjectKeys(encryptedPassword, ['encryptedPassword'])

console.log('Decrypted string:', decryptedPassword);

```

## CLASS Method

### `encryptObjectKeys(input, keys)`

Encrypts the specified keys in the given input object, array, or string.

- **input**: The object, array, or string to be encrypted.
- **keys**: An array of keys to encrypt within the object or array.

**Example**:

```javascript
const encryptedObject = instance.encryptObjectKeys({ ssn: '123-45-6789' }, ['ssn']);
```

### `decryptObjectKeys(input, keys)`

Decrypts the specified keys in the given input object, array, or string.

- **input**: The object, array, or string to be decrypted.
- **keys**: An array of keys to decrypt within the object or array.

**Example**:

```javascript
const decryptedObject = instance.decryptObjectKeys(encryptedObject, ['ssn']);
```

## Environment Variables

For enhanced security, you can configure the following environment variables:

| Variable        | Description                                         | Default Value                                    |
|-----------------|-----------------------------------------------------|--------------------------------------------------|
| `SECRET_KEY`    | The secret key used for encryption and decryption.   | `'some random string of 32 characters'`          |
| `ITERATIONS`    | The number of iterations the input string will undergo during encryption. | `2`                                            |
| `SALT`          | A salt string added for additional security during encryption. | `'some random string of 64 characters'`          |

### Example

To set these environment variables in your `.env` file:

```bash
SECRET_KEY=your-32-character-secret-key
ITERATIONS=5
SALT=your-64-character-salt-string

### Security Considerations

- Ensure that your **secretKey** and **itetrations** values remain consistent between encryption and decryption.
- Store secret keys and itetrations  securely using environment variables or secure key management systems.
- Strong encryption algorithms (e.g., AES-256-CBC) are recommended for sensitive data.

## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
