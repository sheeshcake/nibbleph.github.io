import * as Yup from 'yup';
import { m } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled, useTheme } from '@mui/system';

import {
    Typography,
    Stack,
    Container,
    CardContent,
    Card,
    Box,
    CardHeader
} from '@mui/material';

import emailjs from 'emailjs-com';

// components
import { varFade, MotionContainer } from '../../../components/animate';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'notistack';

import {
    FormProvider,
    RHFTextField,
} from '../../../components/hook-form';
// ----------------------------------------------------------------------

const ContainerStyled = styled('div')(({ theme }) => ({
    height: 'auto',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(12, 0),
}));


const LandingContact = () => {
    const theme = useTheme();

    const { enqueueSnackbar } = useSnackbar();

    const UpdateUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    });

    const defaultValues = {
        description: '',
        email: '',
        name: '',
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;


    const onSubmit = handleSubmit(async (data) => {
        try {

            var templateParams = {
                from_name: data.email,
                to_name: data.name,
                message: data.description,
                reply_to: data.email,
            };

            await emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, templateParams, import.meta.env.VITE_PUBLIC_KEY);
            reset();

            enqueueSnackbar('Email sent successfully', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Failed to send email', { variant: 'error' });
        }

    });

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
                            }}
                        >
                            Contact <span style={{ color: '#3D7A8D' }}>Us</span>
                        </Typography>
                    </m.div>
                    <Typography
                        // variant='h1'
                        sx={{
                            fontFamily: 'Bebas Neue',
                            fontSize: `${10 / 10}rem`,
                            letterSpacing: 3,
                            lineHeight: 1,
                            color: 'grey',
                            [theme.breakpoints.up('md')]: {
                                fontSize: `${15 / 10}rem`,
                                letterSpacing: 3,
                                lineHeight: 1,
                            },
                        }}
                    >
                        Have any question regarding our services?
                    </Typography>
                </Stack>


                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Card
                            sx={{
                                width: 650,
                                marginTop: 5
                            }}
                        >
                            <CardHeader
                                title="Send us a message"
                                subheader="Feel free to reach us"
                            />
                            <CardContent>
                                <Stack
                                    direction='row'
                                    spacing={2}
                                    mb={2}
                                >
                                    <RHFTextField name="name" label="Name" />
                                    <RHFTextField name="email" label="Email" />
                                </Stack>

                                <RHFTextField name="description" label="Message" multiline rows={4} />

                                <LoadingButton type="submit" variant="contained" sx={{ marginTop: 2 }} size='large' fullWidth loading={isSubmitting}>
                                    Save Changes
                                </LoadingButton>
                            </CardContent>
                        </Card>
                    </Box>
                </FormProvider>

            </Container>
        </ContainerStyled>
    );
}
export default LandingContact;