import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import {
  Typography,
  Alert,
  Grid,
  Box,
  Container,
  Stack,
  Divider,
  Badge,
} from "@mui/material";
import _ from "lodash";
import { useDispatch, useSelector } from "../../../redux/store";
import { useQueryClient, useMutation } from "react-query";

import { Fade } from "react-reveal";

import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/iconify/Iconify";
import paymentRoutes from "../../../api/paymentRoutes";
import { emptyCart } from "../../../redux/slices/product";
import sum from "lodash/sum";

// eslint-disable-next-line camelcase
const CheckoutFormPaymentIntent = ({ payment_intent }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const cartData = useSelector((state) => state.product.checkout);
  const elements = useElements();
  const stripeData = useSelector((state) => state.payment);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const couponCode = useSelector((state) => state.redeemCoupon.couponCode);
  const credit = useSelector((state) => state.user.credit)
  const couponType = useSelector((state) =>state.redeemCoupon.couponType)

  useEffect(() => {
    // hide the us bank account element
    const usBankAccountElement = document.querySelector(
      ".StripeElement--payment"
    );
    if (usBankAccountElement) {
      usBankAccountElement.style.display = "none";
    }
  }, []);

  useEffect(() => {
    console.log("Stripe Data", stripeData);
  }, [stripeData]);

  const options = {
    layout: {
      type: "accordion",
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: false,
    },
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const billing_details = {
      email: userData.email,
    };
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const clientSecret = stripeData.clientSecret;
    const result = await stripe
      .confirmPayment({
        // `Elements` instance that was used to create the Payment Element
        elements,
        redirect: "if_required",
        setup_future_usage: "off_session",
        // confirmParams: {
        //   // eslint-disable-next-line camelcase
        //   return_url: `${window.location.origin}/payment-success`,
        // },
      })
      .then((r) => {
        (async () => {
          await paymentRoutes
            .confirmPayment({
              amount: cartData.cart.length > 0
              ? sum(
                  cartData.cart.map(
                    (product) =>
                      (product.price + product.contentLength) *
                      product.quantity
                  )
                )
              : 0,
              source: r.paymentIntent.payment_method,
              coupon_code: couponCode,
              coupon_type: couponType,
              redeem: credit,
              cart_data: cartData.cart.map((item) => {
                return {
                  ...item,
                  price: (item.price + item.contentLength) * item.quantity,
                  contentLength :  item.contentLength == 0 ? 500 : item.contentLength == 12 ? 750 : item.contentLength == 20 ? 1000 : 0
                };
              }),
            })
            .then((r) => {
              dispatch(emptyCart());
              window.location.href = `${window.location.origin}/payment-success`;
            });
        })(r);
        setIsLoading(false);
      });

    //
    if (result.error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(result.error.message);
    }
    // When everything is done, remove the loader
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Show error message to your customers */}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Box marginBottom={2} width="100%">
        <PaymentElement id="payment-element" options={options}  />
        <LoadingButton
          variant="contained"
          size="large"
          fullWidth
          disabled={!stripe}
          type="submit"
          loading={isLoading}
          sx={{
            marginTop: 2
          }}
        >
          <Iconify
            icon="eva:credit-card-outline"
            width={25}
            height={25}
            marginRight={1}
          />
          <Typography>Pay</Typography>
        </LoadingButton>
      </Box>
    </form>
  );
};

export default CheckoutFormPaymentIntent;
