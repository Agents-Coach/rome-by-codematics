import { NextRequest, NextResponse } from "next/server";

// NOTE: In production, use the real Stripe SDK:
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS = {
  starter: {
    name: "Rome Starter",
    price: 4700, // cents
    priceId: "price_starter_monthly", // Replace with real Stripe Price ID
    features: ["1 WhatsApp number", "500 AI responses/month", "Agent configuration", "Chat history"],
  },
  pro: {
    name: "Rome Pro",
    price: 9700,
    priceId: "price_pro_monthly",
    features: ["3 WhatsApp numbers", "2,000 AI responses/month", "Calendar integration", "Lead analytics"],
  },
  agency: {
    name: "Rome Agency",
    price: 19700,
    priceId: "price_agency_monthly",
    features: ["10 WhatsApp numbers", "10,000 AI responses/month", "Human handoff", "Priority support"],
  },
} as const;

type Plan = keyof typeof PLANS;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email, userId } = body as { plan: Plan; email: string; userId: string };

    if (!plan || !PLANS[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (!email || !userId) {
      return NextResponse.json({ error: "Email and userId are required" }, { status: 400 });
    }

    const selectedPlan = PLANS[plan];

    // ── PRODUCTION CODE (uncomment when Stripe is configured) ──────────────
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    //
    // const session = await stripe.checkout.sessions.create({
    //   mode: "subscription",
    //   customer_email: email,
    //   line_items: [
    //     {
    //       price: selectedPlan.priceId,
    //       quantity: 1,
    //     },
    //   ],
    //   metadata: {
    //     userId,
    //     plan,
    //   },
    //   success_url: `${process.env.NEXT_PUBLIC_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
    //   subscription_data: {
    //     metadata: { userId, plan },
    //   },
    //   allow_promotion_codes: true,
    // });
    //
    // return NextResponse.json({ url: session.url });

    // ── DEMO CODE (remove when Stripe is configured) ─────────────────────
    return NextResponse.json({
      demo: true,
      message: "Stripe not configured yet. This would create a checkout session.",
      plan: selectedPlan.name,
      price: selectedPlan.price,
      priceId: selectedPlan.priceId,
      redirect: "/thank-you?demo=true",
    });
  } catch (error) {
    console.error("[Checkout Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ plans: PLANS });
}
