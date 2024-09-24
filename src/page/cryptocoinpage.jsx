import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Cryptostate } from "../Cryptocontext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import htmlReactParser  from "html-react-parser";
import { green } from "@mui/material/colors";

const useStyles=makeStyles(()=>({
    container:{
        display:"flex",
        paddingLeft:50, 
        backgroundColor:"grey",
    },
    sidebar:{
        width:"30%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        marginTop:55,
        paddingRight:60,
        paddingTop:0,
        borderRight:"2px solid black",
    },
    description:{
        width:"100%",
        fontFamily:"sans-serif",
        padding:25,
        marginLeft:0,
        paddingTop:10,
        textAlign:"justify",
    },
    marketData:{
        padding:25,
        marginLeft:0,
        paddingTop:10,
        width:"100%",
        // [theme.breakpoints.down("md")]:{
            // display:"flex",
            // justifyContent:"space-around",
        // }
        // [theme.breakpoints.down("sm")]:{
            // flexDirection:"column",
            // alignItems:"center",
        // },
        // [theme.breakpoints.down("xs")]:{
            // alignItems:"start",
        // }
    }
}));

const Cryptocoinpage=()=>{
    const {id}=useParams();
    const [coin,setCoins]=useState();
    const {curr,sym}=Cryptostate();

    const fetchCoins=async()=>{
        const {data}=await axios.get(SingleCoin(id));
        setCoins(data);
    };
    console.log(coin);

    useEffect(()=>{
        fetchCoins();
    },[]);

    const classes=useStyles();
    if(!coin)
            return <LinearProgress style={{backgroundColor:"green"}}/>
    return(
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                src={coin?.image.large}
                alt={coin?.name}
                height="200"
                style={{marginBottom:20}}
                />
                <Typography variant="h3" fontWeight="800" className={classes.heading}>
                    {coin?.name}
                </Typography>
                <Typography variant="subtitle1" className="classes.description">
                    {htmlReactParser(coin?.description.en.split(".")[0] || '')}
                </Typography>
                <div className={classes.marketData}>
                    <span style={{display:"flex"}}>
                        <Typography variant="h5" fontWeight="800" className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                        variant="h5"
                        style={{fontFamily:"sanserif",}}
                        >
                        {coin?.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{display:"flex"}}>
                        <Typography variant="h5" fontWeight="800" className={classes.heading}>
                            Current Price:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                        variant="h5"
                        style={{fontFamily:"sanserif",}}
                        >
                        {sym}{" "}{(coin?.market_data.current_price[curr.toLowerCase()])}
                        </Typography>
                    </span>
                    <span style={{display:"flex"}}>
                        <Typography variant="h5" fontWeight="800" className={classes.heading}>
                            Market Cap:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                        variant="h5"
                        style={{fontFamily:"sanserif",}}
                        >
                        {sym}{" "}{(coin?.market_data.market_cap[curr.toLowerCase()].toString().slice(0,-7))}
                        </Typography>
                    </span>
                </div>
            </div>
            <CoinInfo coin={coin}/>
        </div>
    )
}
export default Cryptocoinpage