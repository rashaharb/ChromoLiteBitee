// import { prisma } from "@/utils/connect";
// import { NextRequest, NextResponse } from "next/server";


// // CHANGE THE STATUS OF AN ORDER
// export const PUT = async (
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const { id } = params;

//   try {
//     const body = await req.json();

//     await prisma.order.update({
//       where: {
//         id: id,
//       },
//       data: { status: body },
//     });
//     return new NextResponse(
//       JSON.stringify({ message: "Order has been updated!" }),
//       { status: 200 }
//     );
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );

import { NextApiResponse, NextApiRequest } from "next";
import { getStripe } from "../../../utils/get-stripe";
import { getSession } from "next-auth/client";
import { query as q, Client } from "faunadb";

const stripe = getStripe();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "You need to be logged in." });
    }

    const client = new Client({
      secret: process.env.FAUNADB_SECRET,
    });

    const { orderId } = req.query;

    const order: { data: { price: number } } = await client.query(
      q.Get(q.Ref(q.Collection("orders"), orderId))
    );

    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: (order.data.price * 100) + 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } else {
      return res.status(404).json({ error: "Order not found." });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

  }
};
