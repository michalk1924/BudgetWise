"use server"

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = process.env.SALT_ROUNDS || 10;
const secretKey = process.env.JWT_SECRET || "";

export async function signup(
    plainTextPassword: string,
    userId: string
): Promise<{ hashedPassword: string; token: string }> {
    try {
        const salt: string = await bcrypt.genSalt(Number(saltRounds));
        const hashedPassword: string = await bcrypt.hash(plainTextPassword, salt);

        const token: string = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

        return { hashedPassword, token };
    } catch (error: any) {
        throw new Error(`Signup failed: ${error?.message}`);
    }
}

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
    } catch (error: any) {
        throw new Error(`Login failed: ${error?.message}`);
    }
}