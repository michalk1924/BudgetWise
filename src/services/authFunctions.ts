import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET || "";

/**
 * Signup: Hashes a password and returns both the hash and a token.
 * @param plainTextPassword - The password to hash.
 * @param userId - A unique user identifier.
 * @returns An object containing the hashed password and a JWT token.
 */
export async function signup(
    plainTextPassword: string,
    userId: string
): Promise<{ hashedPassword: string; token: string }> {
    try {        
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hashedPassword: string = await bcrypt.hash(plainTextPassword, salt);

        const token: string = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

        return { hashedPassword, token };
    } catch (error:any) {
        throw new Error(`Signup failed: ${error?.message}`);
    }
}

/**
 * Login: Verifies a password and returns a token if valid.
 * @param plainTextPassword - The password to verify.
 * @param storedHashedPassword - The hashed password stored in the database.
 * @param userId - A unique user identifier.
 * @returns A JWT token if login is successful.
 */
export async function login(
    plainTextPassword: string,
    storedHashedPassword: string,
    userId: string
): Promise<string> {
    try {
        
        const isMatch = await bcrypt.compare(plainTextPassword, storedHashedPassword);        

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token: string = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

        return token;
    } catch (error:any) {
        throw new Error(`Login failed: ${error?.message}`);
    }
}
