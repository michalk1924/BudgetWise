"use client"

import { gprovider } from './firebase-config';
import { getAuth, signInWithPopup } from 'firebase/auth';

export async function googleSignup(): Promise<any> {
    try {
        console.log("google signup");

        const result = await signInWithPopup(getAuth(), gprovider);
        console.log("google signup2");

        return result;
    } catch (error: any) {
        throw new Error(`Google signup failed: ${error?.message}`);
    }
};
