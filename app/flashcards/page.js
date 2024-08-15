'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "/firebase.js";
import { collection, getDocs, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Container, Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function Flashcards() {
    const { isSignedIn, isLoaded, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getFlashcards = async () => {
            if (!user) {
                setError('User not authenticated.');
                setLoading(false);
                return;
            }

            try {
                console.log("Fetching flashcards for user ID:", user.id);
                
                // Reference to the user's flashcard sets collection
                const userDocRef = doc(db, 'users', user.id);
                const flashcardSetsRef = collection(userDocRef, 'flashcard_sets');
                
                const querySnapshot = await getDocs(flashcardSetsRef);
                const flashcardsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log("Retrieved flashcards:", flashcardsData);
                setFlashcards(flashcardsData);
            } catch (err) {
                console.error("Error fetching flashcards:", err);
                setError("Failed to load flashcards.");
            } finally {
                setLoading(false);
            }
        };

        getFlashcards();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!isLoaded || !isSignedIn) {
        return <div>Please sign in to view flashcards.</div>;
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.length > 0 ? (
                    flashcards.map((flashcard) => (
                        <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                            <Card>
                                <CardActionArea onClick={() => router.push(`/flashcard?id=${flashcard.id}`)}>
                                    <CardContent>
                                        <Typography variant="h6">{flashcard.name}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No flashcards found.</Typography>
                )}
            </Grid>
        </Container>
    );
}
