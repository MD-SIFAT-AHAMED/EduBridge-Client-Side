import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import { Await } from "react-router";
import toast from "react-hot-toast";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: classInfo, ispending } = useQuery({
    queryKey: ["classes", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });
  console.log(classInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // validate the card
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      console.log("payment method", paymentMethod);
    }

    // create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      price: classInfo.price,
    });
    const clientSecret = res.data.clientSecret;

    // confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setError(null);

        // create payment history
        const paymentData = {
          classId: id,
          amount: classInfo.price,
          name: user.displayName,
          email: user.email,
          transactionId: result.paymentIntent.id,
          paid: new Date().toISOString(),
          classTitle: classInfo.title,
          paymentMethod: result.paymentIntent.payment_method_types[0],
        };

        await axiosSecure.post("/payments", paymentData);
        const enrollData = {
          classId: id,
          title: classInfo.title,
          email: user.email,
          teacher: classInfo.name,
          image: classInfo.image,
        };
        await axiosSecure.post("/enroll/classes", enrollData);
        
        navigate("/dashboard/enrolled-classes");
        toast.success("Payment Successfuly");
      }
    }
  };

  if (ispending) return <LoadingSpinner />;

  return (
    <form
      onSubmit={handleSubmit}
      style={{ minHeight: "calc(100vh - 340px)" }}
      className="max-w-xl mx-auto space-y-1 py-10"
    >
      <CardElement className="border p-4 rounded" />
      <p className="text-red-500">{error}</p>
      <button
        className="btn w-full btn-primary"
        type="submit"
        disabled={!stripe}
      >
        Pay ${classInfo?.price}
      </button>
    </form>
  );
};

export default PaymentForm;
