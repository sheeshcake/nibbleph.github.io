import React from 'react';
import { Card, CardContent, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconButtonAnimate } from '../../../components/animate';
import Iconify from '../../../components/iconify';
import { bgBlur } from '../../../utils/cssStyles';

const LandingNav = () => {
    const theme = useTheme();

    const handleNavigation = (path) => {
        window.location.href = path;
    };

    return (
        <Card
            sx={{
                width: '100%',
                margin: 2,
                ...bgBlur({
                    color: theme.palette.background.default,
                    blur: 6,
                }),
            }}
        >
            <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={5}>
                    <IconButtonAnimate onClick={() => handleNavigation('/#home')}>
                        <Iconify icon="lets-icons:home-duotone" />
                    </IconButtonAnimate>
                    <IconButtonAnimate onClick={() => handleNavigation('/#about')}>
                        <Iconify icon="solar:user-bold-duotone" />
                    </IconButtonAnimate>
                    <IconButtonAnimate onClick={() => handleNavigation('/#portfolio')}>
                        <Iconify icon="solar:case-bold-duotone" />
                    </IconButtonAnimate>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default LandingNav;
