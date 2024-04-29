import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import { styled, useTheme } from '@mui/system';

import {
    Typography,
    Stack,
    CardContent,
    Box,
    Container,
    Grid,
    Card
} from '@mui/material';

// components
import { varFade, MotionContainer } from '../../../components/animate';

import { bgBlur } from '../../../utils/cssStyles';
// Images
import Cedric from '../../../assets/images/cedric.jpg';
import Elijah from '../../../assets/images/elijah.jpg';
import Hanneh from '../../../assets/images/hanneh.jpg';
import Wendale from '../../../assets/images/wendale.jpg';
import Arjohn from '../../../assets/images/arjohn.jpg';
// ----------------------------------------------------------------------

const ContainerStyled = styled('div')(({ theme }) => ({
    height: 'auto',
    backgroundColor: '#000000',
    padding: theme.spacing(12, 0),
}));


const LandingTeam = () => {
    const theme = useTheme();

    const team = [
        {
            name: 'Wendale Franz Dy',
            role: 'CEO & Founder',
            image: Wendale,
        },
        {
            name: 'Arjohn Ely',
            role: 'CTO & Co-Founder',
            image: Arjohn,
        },
        {
            name: 'Cedric Matthew Verdida',
            role: 'COO & Co-Founder',
            image: Cedric,
        },
        {
            name: 'Hanneh Rose Rejas',
            role: 'Digital Marketing',
            image: Hanneh,
        },
        {
            name: 'Elijah Abgao',
            role: 'Project Manager',
            image: Elijah,
        },
    ]

    return (
        <ContainerStyled>
            <Container component={MotionContainer} maxWidth={false}>
                <Stack
                    alignItems='center'
                    justifyContent='center'
                    spacing={2}
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
                                    fontSize: `${80 / 10}rem`,
                                    letterSpacing: 3,
                                    lineHeight: 1,
                                },
                                color: 'white'
                            }}
                        >
                            Our <span style={{ color: '#3D7A8D' }}>Team</span>
                        </Typography>
                    </m.div>
                    <Typography
                        // variant='h1'
                        sx={{
                            fontFamily: 'Bebas Neue',
                            fontSize: `${10 / 10}rem`,
                            letterSpacing: 3,
                            lineHeight: 1,
                            color: '#f3f3f3',
                            [theme.breakpoints.up('md')]: {
                                fontSize: `${15 / 10}rem`,
                                letterSpacing: 3,
                                lineHeight: 1,
                            },
                        }}
                    >
                        The passionate people behind our every projects in Nibble Dev Team
                    </Typography>
                </Stack>

                <Grid
                    container
                    justifyContent='center'
                    alignItems='center'
                    mt={5}
                >
                    {
                        team.map((member, index) => (
                            <Grid key={index} item xs={12} sm={12} md={4} lg={4}>
                                <Card
                                    sx={{
                                        borderRadius: 2,
                                        backgroundColor: 'transparent',
                                        boxShadow: 0,
                                        '&:hover': {
                                            boxShadow: 3,
                                        }
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            sx={{
                                                height: 300,
                                                width: '100%',
                                                borderRadius: 2,
                                                backgroundImage: `url(${member.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                ...bgBlur({
                                                    color: alpha(theme.palette.background.default, 0.72),
                                                    blur: 6,
                                                }),
                                            }}
                                        >
                                        </Box>
                                        <Stack
                                            spacing={2}
                                            mt={2}
                                        >
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    fontFamily: 'Bebas Neue',
                                                    fontSize: `${10 / 10}rem`,
                                                    letterSpacing: 3,
                                                    lineHeight: 1,
                                                    color: '#f3f3f3',
                                                }}
                                            >
                                                {member.role}
                                            </Typography>
                                            <Typography
                                                variant='h3'
                                                sx={{
                                                    fontFamily: 'Bebas Neue',
                                                    fontSize: `${20 / 10}rem`,
                                                    letterSpacing: 3,
                                                    lineHeight: 1,
                                                    color: '#f3f3f3',
                                                }}
                                            >
                                                {member.name}
                                            </Typography>

                                        </Stack>

                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>

            </Container>
        </ContainerStyled>
    );
}
export default LandingTeam;