import { m } from 'framer-motion'
// @mui
import { styled, alpha } from '@mui/material/styles';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';

// ----------------------------------------------------------------------



export const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.lighter} 0%, ${theme.palette.info.lighter} 25%, ${theme.palette.primary.lighter} 50%, ${theme.palette.info.main} 75%, ${theme.palette.info.light} 100%`
  ),
  backgroundSize: '400%',
  fontFamily: "'Barlow', sans-serif",
  fontSize: `${64 / 16}rem`,
  textAlign: 'center',
  lineHeight: 1,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 8,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 20}rem`,
  },
}));


export const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
}));

export const StyledSection = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'relative',
  backgroundImage: `url('/assets/illustrations/login_background.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  borderStartStartRadius: 80,
  borderEndStartRadius: 80,
}));

export const StyledSectionBg = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  transform: 'scaleX(-1)',
}));

export const StyledContent = styled('div')(({ theme }) => ({
  width: 500,
  margin: 'auto',
  display: 'flex',
  // minHeight: '20vh',
  justifyContent: 'center',
  padding: theme.spacing(15, 2),
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    padding: theme.spacing(10, 8, 0, 8),
  },
}));
