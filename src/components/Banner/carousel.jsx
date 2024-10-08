import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { TrendingCoins } from "../../config/api";
import {Cryptostate} from "../../Cryptocontext";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import {Link} from "react-router-dom";

const useStyles=makeStyles((theme)=>({
    carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center",
    },
    carouselItem:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        cursor:"pointer",
        textTransform:"uppercase",
        color:"white",
        textDecoration:"none",
    }
}))

export function numberWithCommas(y){
    return y.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel=()=>{
    const [trend,setTrend]=useState([]);

    const classes=useStyles();

    const {curr,sym}=Cryptostate();

    const TrendingCoinsbyfetch=async()=>{
        const {data}= await axios.get(TrendingCoins(curr));
        setTrend(data); 
    };

    // console.log(trend);
    useEffect(()=>{
        TrendingCoinsbyfetch();
    },[curr]);

    const responsive={
        0:{items:3,},
        512:{
            items:4,
        },
    };

    const items=trend.map((coin)=>{
    let profit=coin.price_percentage_24h>=0;

        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}
            >
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{marginBottom:10}}/>
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={({
                            color:profit>0 ?"green":"red",
                            fontWeight:500,
                        })}
                    >
                        {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{fontSize:22,fontWeight:500}}>
                    {sym}{numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    return <div className={classes.carousel}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
        />
    </div>;
}

export default Carousel;