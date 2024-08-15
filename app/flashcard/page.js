'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "/firebase.js";
import { collection, doc, getDoc } from "firebase/firestore";
import { Container, Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const searchParams = useSearchParams();
    const search = searchParams.get('id'); // ID of the flashcard set
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user || !search) {
                console.log("No user or search ID found");
                return;
            }

            try {
                // Reference to the user's flashcard sets collection
                const userDocRef = doc(db, 'users', user.id);
                const flashcardSetsRef = collection(userDocRef, 'flashcard_sets');
                const flashcardSetDocRef = doc(flashcardSetsRef, search);

                const docSnap = await getDoc(flashcardSetDocRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log("Retrieved document:", data);
                    if (data.flashcards && Array.isArray(data.flashcards)) {
                        setFlashcards(data.flashcards);
                    } else {
                        console.log("No flashcards field found in document");
                        setFlashcards([]);
                    }
                } else {
                    console.log("No such document found!");
                    setFlashcards([]);
                }
            } catch (err) {
                console.error("Error fetching flashcards:", err);
                setFlashcards([]);
            }
        }

        getFlashcards();
    }, [user, search]);

    const handleCardClick = (index) => {
        setFlipped((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.length > 0 ? (
                    flashcards.map((flashcard, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card sx={{
                                boxShadow: 3,
                                '&:hover': {
                                    boxShadow: 6,
                                }
                            }}>
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent sx={{
                                        perspective: '1000px',
                                        position: 'relative',
                                        width: '100%',
                                        height: '200px',
                                        overflow: 'hidden',
                                        '& > div': {
                                            transition: 'transform 0.6s',
                                            transformStyle: 'preserve-3d',
                                            position: 'relative',
                                            width: '100%',
                                            height: '100%',
                                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                            transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                        },
                                        '& > div > div': {
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 2,
                                            boxSizing: 'border-box',
                                            borderRadius: '10px',
                                            backgroundColor: '#f5f5f5',
                                        },
                                        '& > div > div:nth-of-type(2)': {
                                            transform: 'rotateY(180deg)',
                                        },
                                    }}>
                                        <div>
                                            <div>
                                                <Typography variant="h6" align="center">{flashcard.front}</Typography>
                                            </div>
                                            <div>
                                                <Typography variant="h6" align="center">{flashcard.back}</Typography>
                                            </div>
                                        </div>
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
