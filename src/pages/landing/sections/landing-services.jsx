import { m } from 'framer-motion';
// @mui
import { styled, useTheme } from '@mui/system';

import {
    Typography,
    Stack,
    Container,
    Grid,
    Button
} from '@mui/material';

// components
import { varFade, MotionContainer } from '../../../components/animate';
import Iconify from '../../../components/iconify/Iconify';
// ----------------------------------------------------------------------

const ContainerStyled = styled('div')(({ theme }) => ({
    height: 'auto',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(12, 0),
}));


const LandingServices = () => {
    const theme = useTheme();

    return (
        <ContainerStyled>
            <Container component={MotionContainer} maxWidth={false}>

                <Grid
                    container
                    justifyContent='center'
                    alignItems='center'
                >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="724"
                            height="763"
                            fill="none"
                            viewBox="0 0 724 763"
                        >
                            <g clipPath="url(#clip0_1_56)">
                                <rect
                                    width="280"
                                    height="137"
                                    x="52"
                                    y="587"
                                    fill="#F7F7F7"
                                    rx="23"
                                ></rect>
                                <rect
                                    width="280"
                                    height="137"
                                    x="397"
                                    y="496"
                                    fill="#F7F7F7"
                                    rx="23"
                                ></rect>
                                <path
                                    fill="#0E0E0E"
                                    d="M487.92 517v-33.6h8.352c5.28 0 7.872 2.928 7.872 8.304v16.992c0 5.376-2.592 8.304-7.872 8.304h-8.352zm8.256-28.8H493.2v24h2.976c1.68 0 2.688-.864 2.688-3.264v-17.472c0-2.4-1.008-3.264-2.688-3.264zm23.003-4.8l5.376 33.6h-5.328l-.912-6.096h-6.48l-.912 6.096h-4.848l5.376-33.6h7.728zm-4.128 5.952l-2.544 16.992h5.088l-2.544-16.992zm8.599-1.152v-4.8h16.32v4.8h-5.52V517h-5.28v-28.8h-5.52zm28.529-4.8l5.376 33.6h-5.328l-.912-6.096h-6.48l-.912 6.096h-4.848l5.376-33.6h7.728zm-4.128 5.952l-2.544 16.992h5.088l-2.544-16.992zm19.931-5.952c5.472 0 7.824 2.544 7.824 7.728v1.2c0 3.456-1.056 5.664-3.408 6.768 2.832 1.104 3.936 3.648 3.936 7.2v2.736c0 5.184-2.736 7.968-8.016 7.968h-8.304v-33.6h7.968zm-.336 18.48h-2.352v10.32h3.024c1.776 0 2.736-.816 2.736-3.312v-2.928c0-3.12-1.008-4.08-3.408-4.08zm.192-13.68h-2.544v8.88h2.064c1.968 0 3.168-.864 3.168-3.552v-1.872c0-2.4-.816-3.456-2.688-3.456zm23.388-4.8l5.376 33.6h-5.328l-.912-6.096h-6.48L582.97 517h-4.848l5.376-33.6h7.728zm-4.128 5.952l-2.544 16.992h5.088l-2.544-16.992zm11.291 2.112c0-5.376 2.64-8.448 7.776-8.448 5.136 0 7.776 3.072 7.776 8.448v1.056h-4.992v-1.392c0-2.4-.96-3.312-2.64-3.312-1.68 0-2.64.912-2.64 3.312 0 6.912 10.32 8.208 10.32 17.808 0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448v-2.064h4.992v2.4c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264 0-6.912-10.32-8.208-10.32-17.808zm23.905-3.264v9.36h7.248v4.8h-7.248v9.84h9.12v4.8h-14.4v-33.6h14.4v4.8h-9.12zm-122.662 43.2l5.376 33.6h-5.328l-.912-6.096h-6.48l-.912 6.096h-4.848l5.376-33.6h7.728zm-4.128 5.952l-2.544 16.992h5.088l-2.544-16.992zM523.883 565h-5.376c-.288-.864-.48-1.392-.48-4.128v-5.28c0-3.12-1.056-4.272-3.456-4.272h-1.824V565h-5.28v-33.6h7.968c5.472 0 7.824 2.544 7.824 7.728v2.64c0 3.456-1.104 5.712-3.456 6.816 2.64 1.104 3.504 3.648 3.504 7.152v5.184c0 1.632.048 2.832.576 4.08zm-8.592-28.8h-2.544v10.32h2.064c1.968 0 3.168-.864 3.168-3.552v-3.312c0-2.4-.816-3.456-2.688-3.456zm21.808 16.272h4.992v4.464c0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448v-17.472c0-5.376 2.688-8.448 7.872-8.448 5.184 0 7.872 3.072 7.872 8.448v3.264h-4.992v-3.6c0-2.4-1.056-3.312-2.736-3.312-1.68 0-2.736.912-2.736 3.312v18.144c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264v-4.8zm13.476-1.872V565h-5.28v-33.6h5.28v14.4h6v-14.4h5.376V565h-5.376v-14.4h-6zm15.204 14.4v-33.6h5.28V565h-5.28zm7.605-28.8v-4.8h16.32v4.8h-5.52V565h-5.28v-28.8h-5.52zm23.925 0v9.36h7.248v4.8h-7.248v9.84h9.12v4.8h-14.4v-33.6h14.4v4.8h-9.12zm22.712 16.272h4.992v4.464c0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448v-17.472c0-5.376 2.688-8.448 7.872-8.448 5.184 0 7.872 3.072 7.872 8.448v3.264h-4.992v-3.6c0-2.4-1.056-3.312-2.736-3.312-1.68 0-2.736.912-2.736 3.312v18.144c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264v-4.8zm6.66-16.272v-4.8h16.32v4.8h-5.52V565h-5.28v-28.8h-5.52zm18.405-4.8h5.28v25.92c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264V531.4h4.992v25.584c0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448V531.4zm35.781 33.6h-5.376c-.288-.864-.48-1.392-.48-4.128v-5.28c0-3.12-1.056-4.272-3.456-4.272h-1.824V565h-5.28v-33.6h7.968c5.472 0 7.824 2.544 7.824 7.728v2.64c0 3.456-1.104 5.712-3.456 6.816 2.64 1.104 3.504 3.648 3.504 7.152v5.184c0 1.632.048 2.832.576 4.08zm-8.592-28.8h-2.544v10.32h2.064c1.968 0 3.168-.864 3.168-3.552v-3.312c0-2.4-.816-3.456-2.688-3.456zm16.769 0v9.36h7.248v4.8h-7.248v9.84h9.12v4.8h-14.4v-33.6h14.4v4.8h-9.12z"
                                ></path>
                                <path
                                    fill="#0F0F0F"
                                    d="M487.488 231.936v-17.472c0-5.376 2.832-8.448 8.016-8.448s8.016 3.072 8.016 8.448v17.472c0 1.872-.336 3.456-1.008 4.704.24.624.624.72 1.488.72h.48v4.704h-.72c-2.352 0-3.84-.864-4.56-2.304-1.056.384-2.304.624-3.696.624-5.184 0-8.016-3.072-8.016-8.448zm5.28-17.808v18.144c0 2.4 1.056 3.312 2.736 3.312 1.68 0 2.736-.912 2.736-3.312v-18.144c0-2.4-1.056-3.312-2.736-3.312-1.68 0-2.736.912-2.736 3.312zm13.943-7.728h5.28v25.92c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264V206.4h4.992v25.584c0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448V206.4zm31.077 0l5.376 33.6h-5.328l-.912-6.096h-6.48l-.912 6.096h-4.848l5.376-33.6h7.728zm-4.128 5.952l-2.544 16.992h5.088l-2.544-16.992zM545.623 240v-33.6h5.28v28.8h8.688v4.8h-13.968zm16.266 0v-33.6h5.28V240h-5.28zm7.604-28.8v-4.8h16.32v4.8h-5.52V240h-5.28v-28.8h-5.52zm23.59 28.8v-11.136l-6.672-22.464h5.52l4.032 15.312 4.032-15.312h5.04l-6.672 22.464V240h-5.28zm-93.451 14.4l5.376 33.6h-5.328l-.912-6.096h-6.48l-.912 6.096h-4.848l5.376-33.6h7.728zm-4.128 5.952l-2.544 16.992h5.088l-2.544-16.992zm11.291 2.112c0-5.376 2.64-8.448 7.776-8.448 5.136 0 7.776 3.072 7.776 8.448v1.056h-4.992v-1.392c0-2.4-.96-3.312-2.64-3.312-1.68 0-2.64.912-2.64 3.312 0 6.912 10.32 8.208 10.32 17.808 0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448v-2.064h4.992v2.4c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264 0-6.912-10.32-8.208-10.32-17.808zm17.953 0c0-5.376 2.64-8.448 7.776-8.448 5.136 0 7.776 3.072 7.776 8.448v1.056h-4.992v-1.392c0-2.4-.96-3.312-2.64-3.312-1.68 0-2.64.912-2.64 3.312 0 6.912 10.32 8.208 10.32 17.808 0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448v-2.064h4.992v2.4c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264 0-6.912-10.32-8.208-10.32-17.808zm18.385-8.064h5.28v25.92c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264V254.4h4.992v25.584c0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448V254.4zm35.781 33.6h-5.376c-.288-.864-.48-1.392-.48-4.128v-5.28c0-3.12-1.056-4.272-3.456-4.272h-1.824V288h-5.28v-33.6h7.968c5.472 0 7.824 2.544 7.824 7.728v2.64c0 3.456-1.104 5.712-3.456 6.816 2.64 1.104 3.504 3.648 3.504 7.152v5.184c0 1.632.048 2.832.576 4.08zm-8.592-28.8h-2.544v10.32h2.064c1.968 0 3.168-.864 3.168-3.552v-3.312c0-2.4-.816-3.456-2.688-3.456zm23.201-4.8l5.376 33.6h-5.328l-.912-6.096h-6.48l-.912 6.096h-4.848l5.376-33.6h7.728zm-4.128 5.952l-2.544 16.992h5.088l-2.544-16.992zM612.638 288l-6.576-24.336V288h-4.752v-33.6h6.624l5.424 20.112V254.4h4.704V288h-5.424zm19.524-12.528h4.992v4.464c0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448v-17.472c0-5.376 2.688-8.448 7.872-8.448 5.184 0 7.872 3.072 7.872 8.448v3.264h-4.992v-3.6c0-2.4-1.056-3.312-2.736-3.312-1.68 0-2.736.912-2.736 3.312v18.144c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264v-4.8zm13.476-16.272v9.36h7.248v4.8h-7.248v9.84h9.12v4.8h-14.4v-33.6h14.4v4.8h-9.12z"
                                ></path>
                                <g filter="url(#filter0_d_1_56)">
                                    <path
                                        fill="#000"
                                        d="M55 254c0-9.941 8.059-18 18-18h334c9.941 0 18 8.059 18 18v217c0 9.941-8.059 18-18 18H73c-9.941 0-18-8.059-18-18V254z"
                                    ></path>
                                </g>
                                <path
                                    fill="#F4F4F4"
                                    d="M108.488 358.7l3.12 19.383h.078l2.886-19.383h5.967V386h-4.056v-19.578h-.078L113.519 386h-4.056l-3.12-19.305h-.078V386h-3.744v-27.3h5.967zm19.111 6.279v14.742c0 1.95.858 2.691 2.223 2.691 1.365 0 2.223-.741 2.223-2.691v-14.742c0-1.95-.858-2.691-2.223-2.691-1.365 0-2.223.741-2.223 2.691zm-4.29 14.469v-14.196c0-4.368 2.301-6.864 6.513-6.864s6.513 2.496 6.513 6.864v14.196c0 4.368-2.301 6.864-6.513 6.864s-6.513-2.496-6.513-6.864zm22.288-20.748c4.446 0 6.357 2.067 6.357 6.279v.975c0 2.808-.858 4.563-2.769 5.46v.078c2.301.897 3.198 2.925 3.198 5.811v2.223c0 4.212-2.223 6.474-6.513 6.474h-6.747v-27.3h6.474zm-.273 15.015h-1.911v8.385h2.457c1.442 0 2.223-.663 2.223-2.691v-2.379c0-2.535-.819-3.315-2.769-3.315zm.156-11.115h-2.067v7.215h1.677c1.599 0 2.574-.702 2.574-2.886v-1.521c0-1.95-.663-2.808-2.184-2.808zm9.486 23.4v-27.3h4.29V386h-4.29zm7.427 0v-27.3h4.29v23.4h7.059v3.9h-11.349zm17.506-23.4v7.605h5.889v3.9h-5.889v7.995h7.41v3.9h-11.7v-27.3h11.7v3.9h-7.41zM102.56 428v-27.3h6.786c4.29 0 6.396 2.379 6.396 6.747v13.806c0 4.368-2.106 6.747-6.396 6.747h-6.786zm6.708-23.4h-2.418v19.5h2.418c1.365 0 2.184-.702 2.184-2.652v-14.196c0-1.95-.819-2.652-2.184-2.652zm13.502 0v7.605h5.889v3.9h-5.889v7.995h7.41v3.9h-11.7v-27.3h11.7v3.9h-7.41zm13.266-3.9l3.237 22.269h.078l3.237-22.269h3.939l-4.212 27.3h-6.396l-4.212-27.3h4.329zm16.784 3.9v7.605h5.889v3.9h-5.889v7.995h7.41v3.9h-11.7v-27.3h11.7v3.9h-7.41zm10.068 23.4v-27.3h4.29v23.4h7.059v3.9h-11.349zm17.155-21.021v14.742c0 1.95.858 2.691 2.223 2.691 1.365 0 2.223-.741 2.223-2.691v-14.742c0-1.95-.858-2.691-2.223-2.691-1.365 0-2.223.741-2.223 2.691zm-4.29 14.469v-14.196c0-4.368 2.301-6.864 6.513-6.864s6.513 2.496 6.513 6.864v14.196c0 4.368-2.301 6.864-6.513 6.864s-6.513-2.496-6.513-6.864zm22.132-20.748c4.29 0 6.396 2.379 6.396 6.747v3.549c0 4.368-2.106 6.747-6.396 6.747h-2.028V428h-4.29v-27.3h6.318zm0 3.9h-2.028v9.243h2.028c1.365 0 2.106-.624 2.106-2.574v-4.095c0-1.95-.741-2.574-2.106-2.574zm14.311-3.9l3.12 19.383h.078l2.886-19.383h5.967V428h-4.056v-19.578h-.078L217.227 428h-4.056l-3.12-19.305h-.078V428h-3.744v-27.3h5.967zm19.462 3.9v7.605h5.889v3.9h-5.889v7.995h7.41v3.9h-11.7v-27.3h11.7v3.9h-7.41zm19.233 23.4l-5.265-19.773h-.078V428h-3.861v-27.3h5.382l4.329 16.341h.078V400.7h3.822V428h-4.407zm6.231-23.4v-3.9h13.26v3.9h-4.485V428h-4.29v-23.4h-4.485z"
                                ></path>
                                <path fill="url(#pattern0_1_56)" d="M100 285H128V310H100z"></path>
                                <path
                                    fill="#090909"
                                    d="M64.92 175v-33.6h8.352c5.28 0 7.872 2.928 7.872 8.304v16.992c0 5.376-2.592 8.304-7.872 8.304H64.92zm8.256-28.8H70.2v24h2.976c1.68 0 2.688-.864 2.688-3.264v-17.472c0-2.4-1.008-3.264-2.688-3.264zm16.618 0v9.36h7.248v4.8h-7.248v9.84h9.12v4.8h-14.4v-33.6h14.4v4.8h-9.12zm16.328-4.8l4.032 27.408 4.032-27.408h4.848L113.85 175h-7.872l-5.184-33.6h5.328zm20.656 4.8v9.36h7.248v4.8h-7.248v9.84h9.12v4.8h-14.4v-33.6h14.4v4.8h-9.12zM139.17 175v-33.6h5.28v28.8h8.688v4.8H139.17zm21.114-25.872v18.144c0 2.4 1.056 3.312 2.736 3.312 1.68 0 2.736-.912 2.736-3.312v-18.144c0-2.4-1.056-3.312-2.736-3.312-1.68 0-2.736.912-2.736 3.312zm-5.28 17.808v-17.472c0-5.376 2.832-8.448 8.016-8.448s8.016 3.072 8.016 8.448v17.472c0 5.376-2.832 8.448-8.016 8.448s-8.016-3.072-8.016-8.448zm27.239-25.536c5.28 0 7.872 2.928 7.872 8.304v4.368c0 5.376-2.592 8.304-7.872 8.304h-2.496V175h-5.28v-33.6h7.776zm0 4.8h-2.496v11.376h2.496c1.68 0 2.592-.768 2.592-3.168v-5.04c0-2.4-.912-3.168-2.592-3.168zm17.614-4.8l3.888 23.856 3.6-23.856h7.344V175h-4.992v-24.096L206.049 175h-4.992l-3.936-23.76V175h-4.608v-33.6h7.344zm23.952 4.8v9.36h7.248v4.8h-7.248v9.84h9.12v4.8h-14.4v-33.6h14.4v4.8h-9.12zm23.672 28.8l-6.576-24.336V175h-4.752v-33.6h6.624l5.424 20.112V141.4h4.704V175h-5.424zm7.669-28.8v-4.8h16.32v4.8h-5.52V175h-5.28v-28.8h-5.52z"
                                ></path>
                                <path
                                    fill="#0C0C0C"
                                    d="M78.552 119l-1.92-17.904L74.712 119h-7.248L63.72 85.4h5.136l2.832 26.496L74.232 85.4h5.088l2.64 26.688L84.696 85.4h4.608L85.56 119h-7.008zm18.695-28.8v9.36h7.248v4.8h-7.248v9.84h9.12v4.8h-14.4V85.4h14.4v4.8h-9.12zm20.36-4.8c5.472 0 7.824 2.544 7.824 7.728v1.2c0 3.456-1.056 5.664-3.408 6.768 2.832 1.104 3.936 3.648 3.936 7.2v2.736c0 5.184-2.736 7.968-8.016 7.968h-8.304V85.4h7.968zm-.336 18.48h-2.352v10.32h3.024c1.776 0 2.736-.816 2.736-3.312v-2.928c0-3.12-1.008-4.08-3.408-4.08zm.192-13.68h-2.544v8.88h2.064c1.968 0 3.168-.864 3.168-3.552v-1.872c0-2.4-.816-3.456-2.688-3.456z"
                                ></path>
                                <path
                                    fill="#0F0F0F"
                                    d="M102.92 608v-33.6h8.352c5.28 0 7.872 2.928 7.872 8.304v16.992c0 5.376-2.592 8.304-7.872 8.304h-8.352zm8.256-28.8H108.2v24h2.976c1.68 0 2.688-.864 2.688-3.264v-17.472c0-2.4-1.008-3.264-2.688-3.264zm11.338 28.8v-33.6h5.28V608h-5.28zm17.06-13.92v-4.8h7.392v10.656c0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448v-17.472c0-5.376 2.688-8.448 7.872-8.448 5.184 0 7.872 3.072 7.872 8.448v3.264h-4.992v-3.6c0-2.4-1.056-3.312-2.736-3.312-1.68 0-2.736.912-2.736 3.312v18.144c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264v-6.192h-2.4zM150.358 608v-33.6h5.28V608h-5.28zm7.604-28.8v-4.8h16.32v4.8h-5.52V608h-5.28v-28.8h-5.52zm28.529-4.8l5.376 33.6h-5.328l-.912-6.096h-6.48l-.912 6.096h-4.848l5.376-33.6h7.728zm-4.128 5.952l-2.544 16.992h5.088l-2.544-16.992zM194.326 608v-33.6h5.28v28.8h8.688v4.8h-13.968zm-84.11 14.4l3.888 23.856 3.6-23.856h7.344V656h-4.992v-24.096L116.408 656h-4.992l-3.936-23.76V656h-4.608v-33.6h7.344zm30.385 0l5.376 33.6h-5.328l-.912-6.096h-6.48l-.912 6.096h-4.848l5.376-33.6h7.728zm-4.128 5.952l-2.544 16.992h5.088l-2.544-16.992zM164.852 656h-5.376c-.288-.864-.48-1.392-.48-4.128v-5.28c0-3.12-1.056-4.272-3.456-4.272h-1.824V656h-5.28v-33.6h7.968c5.472 0 7.824 2.544 7.824 7.728v2.64c0 3.456-1.104 5.712-3.456 6.816 2.64 1.104 3.504 3.648 3.504 7.152v5.184c0 1.632.048 2.832.576 4.08zm-8.592-28.8h-2.544v10.32h2.064c1.968 0 3.168-.864 3.168-3.552v-3.312c0-2.4-.816-3.456-2.688-3.456zm23.536 28.8l-5.136-13.392-1.632 3.072V656h-5.28v-33.6h5.28v14.64l6.912-14.64h5.28l-7.344 14.976L185.22 656h-5.424zm13.107-28.8v9.36h7.248v4.8h-7.248v9.84h9.12v4.8h-14.4v-33.6h14.4v4.8h-9.12zm10.856 0v-4.8h16.32v4.8h-5.52V656h-5.28v-28.8h-5.52zm18.645 28.8v-33.6h5.28V656h-5.28zm20.421 0l-6.576-24.336V656h-4.752v-33.6h6.624l5.424 20.112V622.4h4.704V656h-5.424zm17.124-13.92v-4.8h7.392v10.656c0 5.376-2.688 8.448-7.872 8.448-5.184 0-7.872-3.072-7.872-8.448v-17.472c0-5.376 2.688-8.448 7.872-8.448 5.184 0 7.872 3.072 7.872 8.448v3.264h-4.992v-3.6c0-2.4-1.056-3.312-2.736-3.312-1.68 0-2.736.912-2.736 3.312v18.144c0 2.4 1.056 3.264 2.736 3.264 1.68 0 2.736-.864 2.736-3.264v-6.192h-2.4z"
                                ></path>
                            </g>
                            <defs>
                                <filter
                                    id="filter0_d_1_56"
                                    width="469.6"
                                    height="352.6"
                                    x="6.2"
                                    y="185.2"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="userSpaceOnUse"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        result="hardAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    ></feColorMatrix>
                                    <feMorphology
                                        in="SourceAlpha"
                                        operator="dilate"
                                        radius="13"
                                        result="effect1_dropShadow_1_56"
                                    ></feMorphology>
                                    <feOffset dx="1" dy="-1"></feOffset>
                                    <feGaussianBlur stdDeviation="18.4"></feGaussianBlur>
                                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                                    <feBlend
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_1_56"
                                    ></feBlend>
                                    <feBlend
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_1_56"
                                        result="shape"
                                    ></feBlend>
                                </filter>
                                <pattern
                                    id="pattern0_1_56"
                                    width="1"
                                    height="1"
                                    patternContentUnits="objectBoundingBox"
                                >
                                    <use transform="scale(.00893 .01)" xlinkHref="#image0_1_56"></use>
                                </pattern>
                                <clipPath id="clip0_1_56">
                                    <path fill="#fff" d="M0 0H724V763H0z"></path>
                                </clipPath>
                                <image
                                    id="image0_1_56"
                                    width="112"
                                    height="100"
                                    xlinkHref="data:image/png;base64,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"
                                ></image>
                            </defs>
                        </svg>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Stack
                            spacing={2}
                            maxWidth={650}
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
                                            fontSize: `${70 / 10}rem`,
                                            letterSpacing: 3,
                                            lineHeight: 1,
                                        },
                                    }}
                                >
                                    Services
                                </Typography>
                            </m.div>
                            <Typography
                                variant='h4'
                                sx={{
                                    fontWeight: 'normal',
                                    // letterSpacing: 3,
                                    // lineHeight: 1,
                                }}
                            >
                                We provide <span style={{ color: '#3D7A8D' }}>customized solutions </span> that meet our clients' unique needs and help them succeed in an increasingly digital world.
                            </Typography>



                        </Stack>
                        <Button
                            sx={{
                                marginTop: 2
                            }}
                            variant='outlined'
                            size='large'
                            endIcon={
                                <Iconify icon='ic:baseline-email' />
                            }
                        >
                            Contact Us
                        </Button>
                    </Grid>
                </Grid>

            </Container>
        </ContainerStyled>
    );
}
export default LandingServices;