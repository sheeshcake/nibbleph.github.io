import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import sum from "lodash/sum";
import {
  Stack,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Container,
} from "@mui/material";
import CheckoutFormPaymentIntent from "./CheckoutForm";
import paymentRoutes from "../../../api/paymentRoutes";
import { setClientSecret } from "../../../redux/slices/payment";

export default function Payment() {
  // const [clientSecret, setClientSecret] = useState("");
  const cartData = useSelector((state) => state.product.checkout);
  const stripeData = useSelector((state) => state.payment);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
  const total_amount = useSelector((state) => state.redeemCoupon.amount);
  const amount = total_amount?.toFixed(0);

  const dispatch = useDispatch();

  const options = {
    // passing the client secret obtained in step 2
    clientSecret: stripeData.clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      theme: "stripe",
    },
  };

  useEffect(() => {
    (async () => {
      // const amount = sum(
      //   cartData.cart.map((product) => product.price * (product.quantity ? 1 : product.quantity))
      // ) * 100;
      await paymentRoutes
        .fetchPaymentIntent({
          amount,
        })
        .then((r) => {
          // setClientSecret(r.client_secret);
          dispatch(setClientSecret(r.client_secret));
        });
    })();
  }, []);

  return (
    <Box>
      {stripeData.clientSecret !== "" && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutFormPaymentIntent />
        </Elements>
      )}
    </Box>
  );
}
