"use client"

import { gprovider } from './firebase-config';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { saveToken } from './cookies';
import { http } from './http';

export async function googleSignup(): Promise<any> {
    try {
        const result = await signInWithPopup(getAuth(), gprovider);

        const user = result.user;
        const userEmail = user.email;
        const userName = user.displayName;

        const token = await user.getIdToken();
        saveToken(token);

        await http.post('/google-signup', { name: userName, email: userEmail });

    } catch (error: any) {
        throw new Error(`Google signup failed: ${error?.message}`);
    }
};
