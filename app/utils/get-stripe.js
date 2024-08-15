import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
        if (!publicKey) {
            console.error('Stripe public key is missing.');
            return null;
        }
        stripePromise = loadStripe(publicKey);
    }
    return stripePromise;
};

export default getStripe;
