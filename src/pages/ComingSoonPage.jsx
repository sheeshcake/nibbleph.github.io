import { m } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Button, Typography, Card, Box, Stack } from "@mui/material";
// components
import { MotionContainer, varBounce } from "../components/animate";
// assets
import { PageNotFoundIllustration } from "../assets/illustrations";
import Like from "../assets/images/like.png"
import { styled, alpha } from "@mui/system";


// ----------------------------------------------------------------------

export default function LandingPage(theme) {
  return (
    <>
      <Helmet>
        <title> Landing Page</title>
      </Helmet>
      <Box sx={{alignSelf:'center'}}>
      <Card sx={{ width: 1200,height: 800,}}>
        <Box sx={{alignItems:'center',paddingTop: 40,}}>
        <MotionContainer>
        <m.div variants={varBounce().in}>
            <Like
            />
          </m.div>
          <m.div variants={varBounce().in}>
            <Typography sx={{ color: "text.secondary" }}>
              We're Still
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph sx={{ color: "blue" }}>
              Cooking our Website.
            </Typography>
          </m.div>
          <m.div variants={varBounce().in}>
            <Typography sx={{ color: "text.secondary" }}>
              We are going to launch our website Very Soon, Stay Tune.
            </Typography>
          </m.div>

          {/* <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div> */}
        </MotionContainer>
        </Box>
      </Card>
      </Box>
    </>
  );
}
