const Stripe = require('stripe');
const express = require('express');
const router = express.Router();
require("dotenv").config();
const Order = require('../models/Order');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "rsd",
        product_data: {
          name: item.title,
          images: [item.img],
          description: item.desc,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price*100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({url: session.url});
});

// CREATE ORDER
const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  const products = Items.map((item) => {
    return {
      productId: item._id,
      quantity: item.quantity,
    };
  });

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data.amount_subtotal/100,
    total: data.amount_total/100,
    shipping: data.customer_details,
    payment_status: data.payment_status
  });

  try 
  {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } 
  catch (err) 
  {
    console.log(err);
  }
};

// STRIPE WEBHOOK
router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;
    let webhookSecret;

    if (webhookSecret) {
      let event;
      let signature = req.headers["stripe-signature"];

      try 
      {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } 
      catch (err) 
      {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      data = event.data.object;
      eventType = event.type;
    } 
    else 
    {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try 
          {
            // CREATE ORDER
            createOrder(customer, data);
          } 
          catch (err) 
          {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }
    res.status(200).end();
  }
);

module.exports = router;