'use client'

import { useEffect, useState } from 'react';
import { Container, CircularProgress, Typography, Box } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

const ResultPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');

    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) {
                setError('Session ID is missing');
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
                const sessionData = await res.json();
                
                if (res.ok) {
                    setSession(sessionData);
                } else {
                    setError(sessionData.error || 'An error occurred');
                }
            } catch (err) {
                setError('An error occurred while fetching the session');
            } finally {
                setLoading(false);
            }
        };

        fetchCheckoutSession();
    }, [session_id]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6">Loading...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
            {session.payment_status === 'paid' ? (
                <>
                    <Typography variant="h4">Thank You For Purchasing</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Your order number is: {session.order_id}</Typography>
                        <Typography variant="h6">You will receive an email confirmation shortly</Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h4">Payment Failed</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Your payment was not successful, please try again</Typography>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default ResultPage;
