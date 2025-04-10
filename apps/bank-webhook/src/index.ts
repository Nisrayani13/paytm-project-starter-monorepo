import express from "express";
import { z } from "zod";
import prisma from "@repo/db/client"

const app = express();

const paymentInformationSchema = z.object({
  token: z.string(),
  userId: z.string(),
  amount: z.number(),
});

app.post("/hdfcWebhook", async (req: any, res: any) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  if (!paymentInformationSchema.safeParse(paymentInformation).success) {
    return res.status(403).json({
      message: "Zod validation for Payment Information failed.",
    });
  }

  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "SUCCESS",
        },
      }),
    ]);

    res.status(200).json({
      message: "captured",
    });
  } catch (error) {
    console.log("Error while processing the webhook:", error);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});


app.listen(3003,()=>{
  console.log("Bank Webhook is listening on port:3003");
})