// Exemple : app/api/create-checkout-session/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req) {
  const body = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Réservation bateau',
            },
            unit_amount: 19900, // en centimes
          },
          quantity: 1,
        },
      ],
      // Tu peux activer les redirections ci-dessous :
      // mode: 'payment',
      // success_url: 'https://ton-site.com/success',
      // cancel_url: 'https://ton-site.com/cancel',
    });

    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
