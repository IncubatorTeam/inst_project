import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-08-16'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const subscriptions = await stripe.subscriptions.list(req.query);
            res.status(200).json(subscriptions);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: 'API_HELPERS_STRIPE_ERROR' });
        }
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
    }
}
