import { NextRequest, NextResponse } from "next/server";

// NOTE: In production, use the real Stripe SDK:
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Stripe Webhook Handler
 *
 * Handles: checkout.session.completed, customer.subscription.updated,
 *          customer.subscription.deleted, invoice.payment_failed
 *
 * Required env vars:
 *   STRIPE_WEBHOOK_SECRET — from Stripe Dashboard → Webhooks
 *   STRIPE_SECRET_KEY     — from Stripe Dashboard → API Keys
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // ── PRODUCTION CODE (uncomment when Stripe is configured) ──────────────
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  //
  // let event: Stripe.Event;
  // try {
  //   event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  // } catch (err) {
  //   console.error("[Webhook] Signature verification failed:", err);
  //   return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  // }
  //
  // switch (event.type) {
  //   case "checkout.session.completed": {
  //     const session = event.data.object as Stripe.Checkout.Session;
  //     const userId = session.metadata?.userId;
  //     const plan = session.metadata?.plan as "starter" | "pro" | "agency";
  //     const customerId = session.customer as string;
  //     const subscriptionId = session.subscription as string;
  //
  //     // TODO: Update user in database
  //     // await prisma.user.update({
  //     //   where: { id: userId },
  //     //   data: {
  //     //     plan,
  //     //     stripeCustomerId: customerId,
  //     //     stripeSubscriptionId: subscriptionId,
  //     //     subscriptionStatus: "active",
  //     //     trialEndsAt: null,
  //     //   },
  //     // });
  //
  //     console.log(`[Webhook] User ${userId} subscribed to ${plan}`);
  //     break;
  //   }
  //
  //   case "customer.subscription.updated": {
  //     const sub = event.data.object as Stripe.Subscription;
  //     const status = sub.status; // active, past_due, canceled, trialing
  //     // TODO: Update subscription status in DB
  //     console.log(`[Webhook] Subscription ${sub.id} updated: ${status}`);
  //     break;
  //   }
  //
  //   case "customer.subscription.deleted": {
  //     const sub = event.data.object as Stripe.Subscription;
  //     // TODO: Set subscriptionStatus = "canceled" in DB
  //     console.log(`[Webhook] Subscription ${sub.id} canceled`);
  //     break;
  //   }
  //
  //   case "invoice.payment_failed": {
  //     const invoice = event.data.object as Stripe.Invoice;
  //     // TODO: Send dunning email, update status to "past_due"
  //     console.log(`[Webhook] Payment failed for invoice ${invoice.id}`);
  //     break;
  //   }
  // }
  //
  // return NextResponse.json({ received: true });

  // ── DEMO CODE ────────────────────────────────────────────────────────
  console.log("[Webhook Demo] Received webhook (Stripe not configured)");
  return NextResponse.json({ received: true, demo: true });
}
