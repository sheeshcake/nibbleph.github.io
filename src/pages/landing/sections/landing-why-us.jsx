import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTime, useSpring } from 'framer-motion';
import Lottie from "react-lottie";
import { debounce } from 'lodash';
// @mui
import { alpha } from '@mui/material/styles';
import { styled, useTheme } from '@mui/system';

import {
    Typography,
    Stack,
    CardContent,
    Box,
    Container,
    Paper,
    Grid
} from '@mui/material';

// components
import { varFade, MotionContainer } from '../../../components/animate';

import Carousel, { useCarousel } from '../../../components/carousel'

// Svgs

import ExpertiseSvg from '../svg/expertise-svg';
import ResultSvg from '../svg/result-svg';
import SolutionSvg from '../svg/solution-svg';
import TechnologySvg from '../svg/technology-svg';
// ----------------------------------------------------------------------

const ContainerStyled = styled('div')(({ theme }) => ({
    height: 'auto',
    width: '100%',
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1003%26quot%3b)' fill='none'%3e%3cpath d='M -818.2475063553885%2c98 C -722.25%2c141.8 -530.25%2c294 -338.2475063553885%2c317 C -146.25%2c340 -50.25%2c182.4 141.7524936446115%2c213 C 333.75%2c243.6 429.75%2c495.6 621.7524936446115%2c470 C 813.75%2c444.4 938.1%2c102.4 1101.7524936446116%2c85 C 1265.4%2c67.6 1372.35%2c323.4 1440%2c383' stroke='rgba(248%2c 249%2c 255%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -352.22638721106796%2c234 C -256.23%2c277 -64.23%2c475.6 127.77361278893203%2c449 C 319.77%2c422.4 415.77%2c106 607.773612788932%2c101 C 799.77%2c96 895.77%2c402 1087.773612788932%2c424 C 1279.77%2c446 1497.33%2c220.4 1567.773612788932%2c211 C 1638.22%2c201.6 1465.55%2c343.8 1440%2c377' stroke='rgba(248%2c 249%2c 255%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -778.3935917557301%2c183 C -682.39%2c202.6 -490.39%2c305.2 -298.39359175573014%2c281 C -106.39%2c256.8 -10.39%2c20.6 181.60640824426986%2c62 C 373.61%2c103.4 469.61%2c469.4 661.6064082442699%2c488 C 853.61%2c506.6 985.93%2c152.8 1141.60640824427%2c155 C 1297.29%2c157.2 1380.32%2c430.2 1440%2c499' stroke='rgba(248%2c 249%2c 255%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -577.3942906885061%2c410 C -481.39%2c360.8 -289.39%2c187.6 -97.39429068850612%2c164 C 94.61%2c140.4 190.61%2c295.8 382.6057093114939%2c292 C 574.61%2c288.2 670.61%2c104.8 862.6057093114939%2c145 C 1054.61%2c185.2 1227.13%2c477.4 1342.605709311494%2c493 C 1458.08%2c508.6 1420.52%2c277 1440%2c223' stroke='rgba(248%2c 249%2c 255%2c 1)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1003'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    // backgroundColor: theme.palette.background.neutral,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));


const LandingWhyUs = ({ currentSlide }) => {

    const theme = useTheme();

    const [currentSlideNumber, setCurrentSlideNumber] = useState(0);

    useEffect(() => {
        if (currentSlide) currentSlide(currentSlideNumber)
    }, [currentSlide, currentSlideNumber])

    const whyUsData = [
        {
            title: 'Expertise',
            description: 'Our team of experienced experts have the knowledge and expertise to deliver innovative IT solutions that meet your unique needs.',
            icon: () => <ExpertiseSvg />
        },
        {
            title: 'Technology',
            description: 'We stay up to date with the latest trends and technologies in the IT industry, so you can get the most advanced solutions available.',
            icon: () => <TechnologySvg />
        },
        {
            title: 'Solutions',
            description: 'We take a personalized approach to every project, working closely with you to understand your business and create solutions.',
            icon: () => <SolutionSvg />
        },
        {
            title: 'Results',
            description: "Our track record speaks for itself - we've helped businesses of all sizes and industries achieve their goals with our IT solutions.",
            icon: () => <ResultSvg />
        }
    ]




    const carousel = useCarousel({
        slidesToShow: 1,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, centerPadding: '0' },
            },
        ],
    });


    const onWheelSlider = debounce((e) => {
        if (e.deltaY > 50) {
            if (currentSlideNumber !== 3)
                carousel.onNext();
        } else if (e.deltaY < 0) {
            if (currentSlideNumber !== 0)
                carousel.onPrev();
        }
    }, 20);

    useEffect(() => {
        console.log('currentSlideNumber', currentSlideNumber)
    }, [currentSlideNumber])

    return (
        <ContainerStyled onWheel={(e) => onWheelSlider(e)}>
            <Container component={MotionContainer} maxWidth='xl'>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    mb={5}
                >
                    <Stack
                        alignItems='center'
                        justifyContent='center'
                    >
                        <m.div variants={varFade().in}>
                            <Typography
                                // variant='h1'
                                sx={{
                                    fontFamily: 'Bebas Neue',
                                    fontSize: `${20 / 10}rem`,
                                    letterSpacing: 3,
                                    lineHeight: 1,
                                    [theme.breakpoints.up('md')]: {
                                        fontSize: `${90 / 10}rem`,
                                        letterSpacing: 3,
                                        lineHeight: 1,
                                    },
                                }}
                            >
                                Why <span style={{ color: '#3D7A8D' }}>Us</span>?
                            </Typography>
                        </m.div>
                        <Typography
                            // variant='h1'
                            sx={{
                                fontFamily: 'Bebas Neue',
                                letterSpacing: 3,
                                lineHeight: 1,
                                color: 'gray'
                            }}
                        >
                            Nibble Software Team
                        </Typography>
                    </Stack>
                </Box>

                <Carousel
                    ref={carousel.carouselRef}
                    {...carousel.carouselSettings}
                    beforeChange={(currentSlide, nextSlide) => setCurrentSlideNumber(nextSlide)}
                >
                    {
                        whyUsData.map((data, key) => (
                            <Box key={key} sx={{ px: 1 }}>
                                <CardWidget card={data} />
                            </Box>
                        ))
                    }
                </Carousel>


            </Container>
        </ContainerStyled>
    );
}

const CardWidget = ({ card }) => {

    const { title, description, icon } = card;
    const theme = useTheme();
    return (
        <Paper
            sx={{
                height: '100%',
                width: '100%',
                backgroundColor: 'transparent'
            }}
        >
            <CardContent>
                <Grid container spacing={4} alignItems='center' justifyContent='center'>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        {icon()}
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <Stack>
                            <Typography
                                sx={{
                                    fontSize: `${20 / 9}rem`,
                                    fontWeight: 'bold',
                                    [theme.breakpoints.up('md')]: {
                                        fontSize: `${30 / 9}rem`,
                                        fontWeight: 'bold',
                                    },
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: `${10 / 9}rem`,
                                    [theme.breakpoints.up('md')]: {
                                        fontSize: `${20 / 9}rem`,
                                    },
                                }}
                            >
                                {description}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Paper>
    )
}

export default LandingWhyUs;