import { m, useScroll, useTime, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

// @mui

import { Box, Stack, Typography, Grid, Container, Button, Divider } from '@mui/material'

import { styled, alpha, useTheme } from '@mui/material/styles';
// hooks
import useResponsive from '../../../hooks/useResponsive'
// theme

// import { secondaryFont } from '../../../theme/typography';
import { textGradient, bgGradient, bgBlur } from '../../../utils/cssStyles'

// Image

import Person from '../../../../public/assets/images/home/person.gif'

// components
import Image from '../../../components/image/Image';
import Iconify from '../../../components/iconify/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import { varFade, MotionContainer } from '../../../components/animate'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    ...bgGradient({

        imgUrl: 'https://i.imgur.com/LspSvdd.gif',
        direction: 'to right',
        startColor: `${alpha('#86B6F6', 0.50)} 0%`,
        endColor: `${alpha('#52D3D8', 0.64)} 100%`,
    }),
    width: '100%',
    height: '100vh',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        top: 0,
        left: 0,
        position: 'fixed',
    },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        marginTop: 2,
    },
}));

const StyledTextGradient = styled(m.h1)(({ theme }) => ({
    ...textGradient(
        `300deg, #FBF8F8 0%, #FFFFFF 25%, #FBF8F8 50%, #ADADB0 75%, #DFDFDF 100%`
    ),
    // padding: 0,
    // marginTop: 8,
    lineHeight: 1,
    // marginBottom: 1,
    letterSpacing: 1,
    // textAlign: 'center',
    backgroundSize: '400%',
    fontSize: `${30 / 16}rem`,
    fontWeight: 'bold',
    // fontFamily: 'OrionPrime',
    [theme.breakpoints.up('md')]: {
        fontSize: `${80 / 12}rem`,
        letterSpacing: 2,
    },
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
    top: -80,
    width: 480,
    right: -80,
    height: 480,
    borderRadius: '50%',
    position: 'absolute',
    filter: 'blur(100px)',
    WebkitFilter: 'blur(100px)',
    backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
    height: 400,
    bottom: -200,
    left: '10%',
    right: '10%',
    borderRadius: '50%',
    position: 'absolute',
    filter: 'blur(100px)',
    WebkitFilter: 'blur(100px)',
    backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledPolygon = styled('div')(({ opacity = 1, anchor = 'left', theme }) => ({
    ...bgBlur({
        opacity,
        color: theme.palette.background.default,
    }),
    zIndex: 9,
    bottom: 0,
    height: 80,
    width: '50%',
    position: 'absolute',
    clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
    ...(anchor === 'left' && {
        left: 0,
    }),
    ...(anchor === 'right' && {
        right: 0,
        transform: 'scaleX(-1)',
    }),
}));

const CloudySvg = styled('div')(({ opacity = 1, theme }) => ({
    // ...bgBlur({
    //     opacity,
    //     color: theme.palette.background.default,
    // }),
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1612%26quot%3b)' fill='none'%3e%3cpath d='M1488 560L0 560 L0 495.54Q37.18 460.72%2c 72 497.9Q89.71 443.61%2c 144 461.32Q209.49 406.81%2c 264 472.3Q331.37 419.67%2c 384 487.04Q401.77 432.81%2c 456 450.59Q521.14 395.73%2c 576 460.87Q619.75 432.62%2c 648 476.36Q718.28 426.64%2c 768 496.92Q787.67 444.6%2c 840 464.27Q892.67 396.94%2c 960 449.61Q1035.2 404.81%2c 1080 480.02Q1124.39 452.41%2c 1152 496.81Q1170.76 443.57%2c 1224 462.33Q1267.19 433.52%2c 1296 476.72Q1319.57 428.29%2c 1368 451.85Q1447.52 411.37%2c 1488 490.89z' fill='rgba(255%2c 255%2c 255%2c 1)'%3e%3c/path%3e%3cpath d='M1560 560L0 560 L0 508.35Q72.51 460.86%2c 120 533.37Q138.25 479.62%2c 192 497.87Q234.51 468.38%2c 264 510.9Q311.23 438.13%2c 384 485.35Q427.48 456.83%2c 456 500.3Q501.08 473.38%2c 528 518.47Q595.78 466.25%2c 648 534.03Q693.57 459.6%2c 768 505.16Q820.96 438.12%2c 888 491.08Q939.88 470.97%2c 960 522.85Q1013.77 456.62%2c 1080 510.39Q1128.03 438.41%2c 1200 486.44Q1282.34 448.77%2c 1320 531.11Q1374.84 465.95%2c 1440 520.79Q1490.69 451.48%2c 1560 502.17z' fill='rgba(233%2c 234%2c 237%2c 0.55)'%3e%3c/path%3e%3cpath d='M1464 560L0 560 L0 568.93Q35.58 532.51%2c 72 568.09Q89.4 513.49%2c 144 530.89Q185.52 500.41%2c 216 541.93Q266.97 520.9%2c 288 571.87Q315.32 527.19%2c 360 554.52Q414.12 488.63%2c 480 542.75Q531.21 521.96%2c 552 573.18Q588.13 489.3%2c 672 525.43Q721.17 502.6%2c 744 551.77Q788.08 523.85%2c 816 567.93Q854.3 486.23%2c 936 524.54Q978.27 494.81%2c 1008 537.08Q1059.25 516.33%2c 1080 567.58Q1129.89 497.47%2c 1200 547.36Q1241.03 516.39%2c 1272 557.42Q1338.15 503.57%2c 1392 569.72Q1410.73 516.46%2c 1464 535.19z' fill='rgba(255%2c 255%2c 255%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1612'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    zIndex: 9,
    bottom: 0,
    height: 80,
    width: '50%',
    position: 'absolute',
}));

const ClippingContainer = styled('div')({
    width: '200px',
    height: '200px',
    overflow: 'hidden',
    position: 'relative',
});

const ClippingPath = styled(m.path)({
    fill: '#fff',
    clipPath: 'url(#blob-clip-path)',
});

// ----------------------------------------------------------------------

const LandingHero = () => {

    const mdUp = useResponsive('up', 'md');

    const heroRef = useRef(null);

    const { scrollY } = useScroll();

    const [percent, setPercent] = useState(0);

    const getScroll = useCallback(() => {
        let heroHeight = 0;

        if (heroRef.current) {
            heroHeight = heroRef.current.offsetHeight;
        }

        scrollY.on('change', (scrollHeight) => {
            const scrollPercent = (scrollHeight * 100) / heroHeight;

            setPercent(Math.floor(scrollPercent));
        });
    }, [scrollY]);

    useEffect(() => {
        getScroll();
    }, [getScroll]);

    const transition = {
        repeatType: 'loop',
        ease: 'linear',
        duration: 60 * 4,
        repeat: Infinity,
    };

    const hide = percent > 120;

    const renderPolygons = (
        <>
            <StyledPolygon />
            <StyledPolygon anchor="right" opacity={0.48} />
            <StyledPolygon anchor="right" opacity={0.48} sx={{ height: 48, zIndex: 10 }} />
            <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
        </>
    );



    const renderEllipses = (
        <>
            {mdUp && <StyledEllipseTop />}
            <StyledEllipseBottom />
        </>
    );

    const renderDescription = (
        <Stack
            alignItems="start"
            justifyContent="start"
            sx={{
                height: 1,
                mx: 'auto',
                maxWidth: 480,
            }}
            spacing={3}
        >

            <m.div variants={varFade().in}>
                <Stack direction='row' spacing={3}>

                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            border: 3,
                            borderRadius: 3,
                            borderColor: 'orange'
                        }}
                    />
                    <Typography
                        variant='h1'
                        color='white'
                    >
                        Transform your Business
                    </Typography>
                </Stack>
            </m.div>

            <m.div variants={varFade().in}>
                <Typography
                    sx={{
                        color: 'white',
                        textAlign: 'start',
                    }}
                >
                    Our team of experts has years of experience in the IT industry and a passion for innovative technology solutions. We're dedicated to delivering solutions that are tailored to your unique needs and budget, and that exceed your expectations
                </Typography>
            </m.div>

            <Button
                sx={{
                    color: 'white',
                    borderRadius: 5
                }}
                variant='contained'
                size='large'
                color='primary'
                endIcon={<Iconify icon='bx:bx-right-arrow-alt' color='white' />}
            >
                Get Started
            </Button>

        </Stack >
    );

    return (
        <>
            <StyledRoot
                ref={heroRef}
                sx={{
                    ...(hide && {
                        opacity: 0,
                    }),
                }}
            >


                <StyledWrapper>
                    <Container component={MotionContainer} maxWidth='xl' sx={{ height: 1 }}>
                        <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }} alignItems='center'>
                            <Grid item xs={12} md={6}>
                                {renderDescription}
                            </Grid>

                            {mdUp && <Grid item md={6}>
                                <Image src={Person} />

                            </Grid>}
                        </Grid>
                    </Container>

                    {renderEllipses}
                </StyledWrapper>

            </StyledRoot>

            {/* {mdUp && cloudySvg} */}
            <Box
                sx={{
                    backgroundImage: `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1440 700'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: url(%23linear-gradient); %7D .cls-1, .cls-2 %7B stroke-width: 0px; %7D .cls-2 %7B fill: %23fff; %7D %3C/style%3E%3ClinearGradient id='linear-gradient' x1='961.97' y1='307.89' x2='961.97' y2='0' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23e6e7e8'/%3E%3Cstop offset='1' stop-color='%23fff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath class='cls-1' d='M1.97,180.89s142.74-86.09,246.04-36c0,0,84.52-118.96,195.65-51.65,0,0,158.09-206.61,327.13-4.7,0,0,117.39-67.3,209.74,92.35,0,0,194.09-103.3,281.74,12.52,0,0,46.96-177.76,201.91-96.7,0,0,175.3-185.04,328.7,13.75,0,0,89.13-40.02,129.09-13.75v204.7L1.97,307.89v-127Z'/%3E%3Cpath class='cls-2' d='M0,125.12S185.41-31.98,291.06,202.8c0,0,69.65-25.04,93.13,10.96,0,0,118.96-169.04,278.61,0,0,0,89.22-40.7,151.83,12.52,0,0,72-118.96,226.96-61.04,0,0,117.39-61.04,180-3.13,0,0,151.83-65.74,226.96,40.7,0,0,114.26-53.22,178.43,6.26,0,0,176.78-183.13,295-31.3v130.13H1.97L0,125.12Z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    position: 'absolute',
                    bottom: -650,
                    // top: ,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            />

            <Box sx={{ height: { md: '100vh' } }} />
        </>
    );
}

export default LandingHero