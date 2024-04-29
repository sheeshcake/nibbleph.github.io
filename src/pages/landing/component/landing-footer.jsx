import React from 'react';
import { Card, CardContent, Stack } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { IconButtonAnimate } from '../../../components/animate';
import Iconify from '../../../components/iconify';
import { textGradient, bgGradient, bgBlur } from '../../../utils/cssStyles';

const LandingFooter = () => {
    const theme = useTheme();
    return (
        <Card
            sx={{
                width: '100vw',
                margin: 2,
                ...bgBlur({
                    color: theme.palette.background.default,
                    blur: 6,
                }),
            }}
        >
            <CardContent>
                
            </CardContent>
        </Card>
    );
};

export default LandingFooter;
