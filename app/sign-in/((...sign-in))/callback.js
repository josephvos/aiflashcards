

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';

const SSOCallback = () => {
    const router = useRouter();
    const { signIn } = useSignIn();

    useEffect(() => {
        const handleSignIn = async () => {
            try {
                // This is a placeholder for any logic to handle the callback
                // For example, Clerk will handle the sign-in for you
                await signIn.handleCallback();

                // Redirect to a different page after sign-in
                router.push('/dashboard');
            } catch (error) {
                console.error('Sign-in error:', error);
                // Optionally handle error or redirect to an error page
                router.push('/error');
            }
        };

        handleSignIn();
    }, [router, signIn]);

    return (
        <div>
            <h1>Processing Sign-In...</h1>
        </div>
    );
};

export default SSOCallback;
