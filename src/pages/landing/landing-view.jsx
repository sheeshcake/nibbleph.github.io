import React, { useRef, useEffect, useState } from 'react';
import useScrollSpy from 'react-use-scrollspy';
import { Box } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Section
import LandingHero from './sections/landing-hero';
import LandingAbout from './sections/landing-about';
import LandingWhyUs from './sections/landing-why-us';
import LandingServices from './sections/landing-services';
import LandingPortfolio from './sections/landing-portfolio';
import LandingTeam from './sections/landing-team';
import LandingContact from './sections/landing-contact';
// Component
import LandingNav from './component/landing-nav';
import LandingFooter from './component/landing-footer';
// import Footer from 'src/layouts/main/Footer';
import Header from '../../layouts/main/Header';
import Footer from '../../layouts/main/Footer'
const LandingView = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const sectionRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    useEffect(() => {
        AOS.init();
    }, []);

    // Get the current scroll position
    const scrollPosition = useScrollSpy({
        offsetPx: -50, // Adjust this value if needed
        activeSection: currentSlide,
    });

    return (
        <>
            <Header />
            <Box
                id="home"
                ref={sectionRefs[0]}
            >
                <LandingHero />
            </Box>
            <Box
                sx={{
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: 'background.default',
                }}
            >
                <Box
                    id="about"
                    ref={sectionRefs[1]}
                >
                    <LandingAbout />
                </Box>

                <Box
                    id="meet_the_team"
                    ref={sectionRefs[2]}
                >
                    <LandingWhyUs currentSlide={(slide) => setCurrentSlide(slide)} />
                </Box>

                <Box
                    id="portfolio"
                    ref={sectionRefs[3]}
                >
                    <LandingPortfolio />
                </Box>



                <Box
                    id="services"
                    ref={sectionRefs[4]}
                >
                    <LandingServices />
                </Box>

                <Box
                    id="services"
                    ref={sectionRefs[5]}
                >
                    <LandingTeam />
                </Box>

                <Box
                    id="contact"
                    ref={sectionRefs[6]}
                >
                    <LandingContact />
                </Box>

                <Footer />


            </Box>
        </>
    );
};

export default LandingView;
