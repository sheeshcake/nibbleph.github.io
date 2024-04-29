import { m, AnimatePresence } from 'framer-motion';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

import {
    Paper,
    Typography,
    Container,
    Stack,
    Grid,
    Card,
    CardContent,
    Box,
    Tooltip,
    Button
} from '@mui/material';

// components
import { varFade, MotionViewport } from '../../../components/animate';
import Iconify from '../../../components/iconify/Iconify';
import { IconButtonAnimate } from '../../../components/animate';

// Css
import { bgGradient, bgBlur } from '../../../utils/cssStyles';

// Images

import Oasis from '../../../assets/images/oasis.jpg';
import RankBoss from '../../../assets/images/rankboss.jpg';
import NewsNetwork from '../../../assets/images/news-network.jpg';
import SparcMobile from '../../../assets/images/sparc-mobile.jpg';
import SparcWeb from '../../../assets/images/sparc-web.jpg';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    ...bgGradient({
        color: '#f3f3f3',
        imgUrl: 'https://i.imgur.com/LspSvdd.gif',
    }),
    width: '100%',
    height: 'auto',
    padding: 10
}));

const LandingPortfolio = () => {
    const theme = useTheme();
    return (
        <StyledRoot>
            <Typography
                variant='h1'
                sx={{
                    fontFamily: 'Bebas Neue',
                    letterSpacing: 3,
                    lineHeight: 1,
                    padding: 5
                }}
            >
                Projects
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                    <Card
                        sx={{
                            height: '60vh',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Background Image */}
                        <Box
                            component="div"
                            style={{
                                backgroundImage: `url('${Oasis}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                filter: 'blur(2px)', // Optional: Add blur to the background
                            }}
                        />

                        {/* Overlay */}
                        <Box
                            component="div"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
                            }}
                        />

                        <Button
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: '10px',
                            }}
                            variant='contained'
                            onClick={() => {
                                window.open('https://www.oasisdentalcallcenter.com/', '_blank')
                            }}
                        >
                            Visit Project
                        </Button>
                        {/* Content */}
                        <CardContent
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                color: 'white', // Customize text color
                            }}
                        >

                            {/* Title */}
                            <Typography variant="h4" gutterBottom>
                                Oasis Dental Call Center
                            </Typography>

                            {/* Description */}
                            <Typography variant="body1">
                                The Oasis Dental Call Center is currently in its inception phase, having been conceived through the collaboration of the Gabucan brothers.
                            </Typography>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Card
                        sx={{
                            height: '60vh',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Background Image */}
                        <Box
                            component="div"
                            style={{
                                backgroundImage: `url('${RankBoss}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                filter: 'blur(2px)', // Optional: Add blur to the background
                            }}
                        />

                        {/* Overlay */}
                        <Box
                            component="div"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
                            }}
                        />


                        <Button
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: '10px'
                            }}
                            variant='contained'
                            onClick={() => {
                                window.open('https://rankboss-web-staging.up.railway.app/', '_blank')
                            }}
                        >
                            Visit Project
                        </Button>

                        {/* Content */}
                        <CardContent
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                color: 'white', // Customize text color
                            }}
                        >
                            {/* Title */}
                            <Typography variant="h4" gutterBottom>
                                Rank Boss
                            </Typography>

                            {/* Description */}
                            <Typography variant="body1">
                                Elevate your website's authority and drive targeted traffic by leveraging our high-quality, natural links tailored to enhance your online visibility and boost search engine rankings.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={4} lg={4}>
                            <Card
                                sx={{
                                    height: '37vh',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Background Image */}
                                <Box
                                    component="div"
                                    style={{
                                        backgroundImage: `url('${NewsNetwork}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        filter: 'blur(2px)', // Optional: Add blur to the background
                                    }}
                                />

                                {/* Overlay */}
                                <Box
                                    component="div"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
                                    }}
                                />

                                <Button
                                    sx={{
                                        position: 'absolute',
                                        top: 10,
                                        right: '10px',
                                    }}
                                    variant='contained'
                                    onClick={() => {
                                        window.open('https://web.clicknowseo.com/', '_blank')
                                    }}
                                >
                                    Visit Project
                                </Button>

                                {/* Content */}
                                <CardContent
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        color: 'white', // Customize text color
                                    }}
                                >
                                    {/* Title */}
                                    <Typography variant="h4" gutterBottom>
                                        News Network
                                    </Typography>

                                    {/* Description */}
                                    <Typography variant="body1">
                                        You can automate posting of your articles by scheduling posts up to 30 days into the future, saving you time
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Card
                                sx={{
                                    height: '37vh',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Background Image */}
                                <Box
                                    component="div"
                                    style={{
                                        backgroundImage: `url('${SparcMobile}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        filter: 'blur(2px)', // Optional: Add blur to the background
                                    }}
                                />

                                {/* Overlay */}
                                <Box
                                    component="div"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
                                    }}
                                />

                                {/* Content */}
                                <CardContent
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        color: 'white', // Customize text color
                                    }}
                                >
                                    {/* Title */}
                                    <Typography variant="h4" gutterBottom>
                                        Sparc Mobile
                                    </Typography>

                                    {/* Description */}
                                    <Typography variant="body1">
                                        Monitoring information to enhance efficiency, reliability, and accessibility for both staff and the general public.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Card
                                sx={{
                                    height: '37vh',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Background Image */}
                                <Box
                                    component="div"
                                    style={{
                                        backgroundImage: `url('${SparcWeb}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        filter: 'blur(2px)', // Optional: Add blur to the background
                                    }}
                                />

                                {/* Overlay */}
                                <Box
                                    component="div"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
                                    }}
                                />

                                {/* Content */}
                                <CardContent
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        color: 'white', // Customize text color
                                    }}
                                >
                                    {/* Title */}
                                    <Typography variant="h4" gutterBottom>
                                        Sparc Web
                                    </Typography>

                                    {/* Description */}
                                    <Typography variant="body1">
                                        Simplifying the Job for Enforcers, Allowing Effortless Access to Drivers' Recent Violation Records.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StyledRoot>
    );
}

export default LandingPortfolio;