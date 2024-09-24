import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography } from "@mui/material";
import Carousel from "./carousel";


const useStyles=makeStyles(()=>({
    banner:{
        backgroundImage:"url(../images/image.png)"
    },
    bannerContent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:80,
        justifyContent:"space-around",
    },
    tagline:{
        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
    }
}));

const Banner=()=>{
    const classes=useStyles();
    return <div className={classes.banner}> 
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                    variant="h2"
                    style={{
                        fontWeight:"bold",
                        marginBottom:15,
                        fontFamily:"sans-serif",
                        color:"white",
                    }}>
                    CryptoPulse
                </Typography>
                <Typography
                variant="subtitle2"
                style={{
                    color:"white",
                    textTransform:"capitalize",
                    fontFamily:"sans-serif",
                }}
                >
                    Master the Market, Anytime, Anywhere.
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
};
export default Banner;