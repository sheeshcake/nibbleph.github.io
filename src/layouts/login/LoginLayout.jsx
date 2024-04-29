import { m } from 'framer-motion';
import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Box } from '@mui/material';
// components
import Logo from '../../components/logo';
import { MotionContainer, varFade } from '../../components/animate';
import Scrollbar from '../../components/scrollbar/Scrollbar';
import Image from '../../components/image'
import logo from "../../assets/images/logo_rb.png";

//
import { StyledGradientText, StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      {/* <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      /> */}
      
      <Image
            sx={{
              zIndex: 9,
              position: 'absolute',
              mt: { xs: 1.5, md: 5 },
              ml: { xs: 2, md: 5 },
              height: 100,
            }}
          src={logo}
        />
      

      <StyledContent>
        <Stack sx={{ width: 1 }}>
            {children}
        </Stack>
      </StyledContent>

      <StyledSection>
        <Box component={MotionContainer} marginBottom={3}>
          <m.div variants={varFade().in}>
            <StyledGradientText
              animate={{ backgroundPosition: '200% center' }}
              transition={{
                repeatType: 'reverse',
                ease: 'linear',
                duration: 20,
                repeat: Infinity,
              }}
            >
              {title || 'Hi, Welcome back'}
            </StyledGradientText>
          </m.div>
        </Box>
        <StyledSectionBg />
      </StyledSection>

    </StyledRoot>
  );
}
