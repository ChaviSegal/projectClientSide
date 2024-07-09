import React, { useState, useEffect } from 'react';
import 'animate.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { keyframes } from 'styled-components';
import { Link, Outlet } from "react-router-dom";


const Home = () => {
    const images = [
        "../pictures/תמונהלדףבית1.png",
        "../pictures/תמונהלדףבית2.png"
    ];

    const companies = [
        "../pictures/מותג2.png",
        "../pictures/מותג15.png",
        "../pictures/מותג4.png",
        "../pictures/מותג5.png",
        "../pictures/מותג6.png",
        "../pictures/מותג7.png",
        "../pictures/מותג8.png",
        "../pictures/מותג9.png",
        "../pictures/מותג10.png",
        "../pictures/מותג11.png",
        "../pictures/מותג12.png",
        "../pictures/מותג13.png",
        "../pictures/מותג14.png",
        "../pictures/מותג16.png",
        "../pictures/מותג17.png",
        "../pictures/מותג18.png",
        "../pictures/מותג19.png",
        "../pictures/מותג21.png",
        "../pictures/מותג22.png",
        "../pictures/מותג23.png",
        "../pictures/מותג24.png",
        "../pictures/מותג25.png",
        "../pictures/מותג26.png",
        "../pictures/מותג27.png",
        "../pictures/תמונהלדףביתמותג1.png",
    ];



    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const homeImages = [
        {
            url: "../pictures/תמונהלדףביתאמבטיותואביזרים.png",
            title: 'אמבטיות ואביזרים',
            width: '28%',
            link: "/BathAndBabyCare"
        },
        {
            url: "../pictures/תמונהלדףביתהאכלהוהנקה.png",
            title: 'הנקה ואוכל',
            width: '40%',
            link: "/FeedingAndPacifiers"
        },
        {
            url: "../pictures/תמונהלדףביתטקסטילואופנה.png",
            title: 'טקסטיל ואופנה',
            width: '28%',
            link: "/TextilesAndFashion"
        },
        {
            url: "../pictures/תמונהלדףביתצעצועים.png",
            title: 'צעצועים',
            width: '30%',
            link: "/toys"
        },
        {
            url: "../pictures/תמונהלדףביתמבצעים.png",
            title: 'ריהוט',
            width: '30%',
            link: "/Furniture"
        },

        {
            url: "../pictures/מושביבטיחותתמונהלדףהבית.png",
            title: 'מושבי בטיחות',
            width: '30%',
            link: "/safetySeats"
        },
    ];
    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,
        width: `calc(29.33% - 16px)`, // הוספתי כאן ערך דינמי המחשב את רוחב התמונה כך שיהיה מרווח של 2% בין התמונות
        margin: '0.2%', // הוספתי מרווח של 1% מכל צד לתמונה
        [theme.breakpoints.down('sm')]: {
            width: '100% !important',
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
        fontSize: '50rem'
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

    const StyledImage = styled('img')({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    });

    const [startIndex, setStartIndex] = useState(0);
    const [visibleCompanies, setVisibleCompanies] = useState(companies.slice(0, 10));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setStartIndex(prevIndex => (prevIndex + 1) % companies.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setVisibleCompanies(companies.slice(startIndex, startIndex + 10));
        if (startIndex === companies.length - 10) {
            setStartIndex(0);
        }
    }, [startIndex, companies]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 7000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <img className={`Home animate__animated animate__fadeInLeft`} style={{ width: "100%", height: "100%" }}
                src={images[currentImageIndex]}
                alt="home"
                key={currentImageIndex}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: "2%", marginTop: "4%" }}>
                {visibleCompanies.map((company, index) => (
                    <img
                        className={`companies animate__animated animate__fadeInLeft`}
                        key={index}
                        src={company}
                        alt={`company-${index}`}
                        style={{ width: 'auto', height: '25px', margin: '2%' }}
                    />
                ))}
            </div>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center', // יירכיב את האיברים באמצע הדף
                paddingX: '1rem', // מרחק שווה משני הצדדים
                paddingTop: '4rem', // מרחק מהחלק העליון
                width: '97%',
                marginBottom: "6%"
            }}>
                {homeImages.map((image) => (
                    // <Link to={image.link}>
                        <ImageButton
                            key={image.title} // הוספת פרופ "key" ייחודי לכל איבר ברשימה
                            focusRipple
                            style={{
                                width: image.width, fontSize: "30px"
                            }}
                        >
                            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    sx={{
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    }}
                                >
                                    {image.title}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                            <Link to={image.link} />
                        </ImageButton>
                    // {/* </Link> */}
                ))}
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center', paddingX: '1rem', marginBottom: "6%", flexWrap: 'nowrap' }}>
                <div style={{ width: 'auto', height: 'auto', textAlign: 'center', display: 'inline-block', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '10px' }}><img style={{ width: '80px', height: '70px' }} src='../pictures/ייעוץוליווימקצועי.png' /></div>
                    <div style={{ fontSize: '17px' }}>ייעוץ וליווי מקצועי</div>
                    <div style={{ fontSize: '13px' }}>הקניה באתר מאובטחת בתקן PCI המחמיר של חברות האשראי</div>
                </div>
                <div style={{ width: 'auto', height: 'auto', textAlign: 'center', display: 'inline-block', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '10px' }}><img style={{ width: '80px', height: '70px' }} src='../pictures/ahk.png' /></div>
                    <div style={{ fontSize: '17px' }}>ייעוץ וליווי מקצועי</div>
                    <div style={{ fontSize: '13px' }}>הקניה באתר מאובטחת בתקן PCI המחמיר של חברות האשראי</div>
                </div>
                <div style={{ width: 'auto', height: 'auto', textAlign: 'center', display: 'inline-block', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '10px' }}><img style={{ width: '60px', height: '70px' }} src='../pictures/bxhuigahr.png' /></div>
                    <div style={{ fontSize: '17px' }}>ייעוץ וליווי מקצועי</div>
                    <div style={{ fontSize: '13px' }}>הקניה באתר מאובטחת בתקן PCI המחמיר של חברות האשראי</div>
                </div>
                <div style={{ width: 'auto', height: 'auto', textAlign: 'center', display: 'inline-block', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '10px' }}><img style={{ width: '60px', height: '70px' }} src='../pictures/קניהמאובטחת.png' /></div>
                    <div style={{ fontSize: '17px' }}>ייעוץ וליווי מקצועי</div>
                    <div style={{ fontSize: '13px' }}>הקניה באתר מאובטחת בתקן PCI המחמיר של חברות האשראי</div>
                </div>
                <div style={{ width: 'auto', height: 'auto', textAlign: 'center', display: 'inline-block', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '10px' }}><img style={{ width: '60px', height: '70px' }} src='../pictures/nu,dhonuchkho.png' /></div>
                    <div style={{ fontSize: '17px' }}>ייעוץ וליווי מקצועי</div>
                    <div style={{ fontSize: '13px' }}>הקניה באתר מאובטחת בתקן PCI המחמיר של חברות האשראי</div>
                </div>
                <div style={{ width: 'auto', height: 'auto', textAlign: 'center', display: 'inline-block', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '10px' }}><img style={{ width: '60px', height: '70px' }} src='../pictures/פריסהארציתנרחבת.png' /></div>
                    <div style={{ fontSize: '17px' }}>ייעוץ וליווי מקצועי</div>
                    <div style={{ fontSize: '13px' }}>הקניה באתר מאובטחת בתקן PCI המחמיר של חברות האשראי</div>
                </div>
            </div>






        </>
    );
};
export default Home;







