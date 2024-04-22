"use client";
import { useCartStore } from "@/utils/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const SuccessPage = () => {
  const router = useRouter();
  const searchparams = useSearchParams()
  const payment_intent = searchparams.get('payment_intent')
  const { emptyCart } = useCartStore();
  
  useEffect(() => {
    // Only run the effect if payment_intent is present
    
    if (payment_intent) {
      const makeRequest = async () => {
        try {
          const response = await fetch(`https://chromolitebite.netlify.app/api/confirm/${payment_intent}`, {
            method: "PUT",
          });

          // If the response is not OK, log the error (this can be improved to handle errors more gracefully)
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }

          // Redirect after a delay to give the user time to see the success message
          setTimeout(() => {
            router.push("/orders");
            emptyCart()
          }, 3000);

        } catch (err) {
          console.error('Failed to confirm payment:', err);
        }
      };

      makeRequest();
    }
  }, [payment_intent, router]);

  return (
    <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
      <p className="max-w-[600px]">
        Payment successful. You are being redirected to the orders page.
        Please do not close the page.
      </p>
      <ConfettiExplosion />
    </div>
  );
};

export default SuccessPage;
