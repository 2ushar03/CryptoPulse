// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { CoinList } from "../config/api";
// import { Cryptostate } from "../Cryptocontext";
// import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { useNavigate } from "react-router";

// const useStyles=makeStyles(()=>({
    
// }))


// const coinsTable=()=>{
//     const [coins,setCoins]=useState([]);
//     const [load,setLoad]=useState(0);
//     const [search,setSearch]=useState();

//     const {curr}=Cryptostate();

//     const fetchCoins=async()=>{
//         setLoad(1);
//         const {data}=await axios.get(CoinList);
//         setCoins(data);
//         setLoad(0);
//     }

//     useEffect(()=>{
//         fetchCoins();
//     },[curr]);

//     const handleSearch=()=>{
//         if (!Array.isArray(coins) || typeof search !== 'string') {
//             return [];
//         }
    
//         const lowerCaseSearch = search.trim().toLowerCase();
    
//         return coins.filter((coin) => 
//             (coin.name && coin.name.toLowerCase().includes(lowerCaseSearch)) || 
//             (coin.sym && coin.sym.toLowerCase().includes(lowerCaseSearch))
//         );
//     }

//     const history=useNavigate();
//     const classes=useStyles();

//     return(
//         <Container style={{textAlign:"center"}}>
//             <Typography 
//                 variant="h4"
//                 style={{margin:20,fontFamily:"sans-serif"}}
//             >
//                Price Visualizer 
//             </Typography>
//             <TextField
//                 label="Search For a Crypto Currency" variant="outlined"
//                 style={{marginBottom:"20",width:"100%"}}
//                 onChange={(e)=>setSearch(e.target.value)}
//             />
//             <TableContainer>
//                 {
//                     load ? (
//                         <LinearProgress style={{backgroundColor:"gold"}}/>
//                     ):(
//                         <Table>
//                         <TableHead style={{ backgroundColor: "black" }}>
//                             <TableRow>
//                                 {["Coin", "Price", "24h Change", "Market Cap"].map((top) => (
//                                     <TableCell
//                                         style={{
//                                             color: "white",
//                                             fontWeight: "900",
//                                             fontFamily: "sans-serif",
//                                         }}
//                                         key={top}
//                                         align={top === "Coin" ? "left" : "right"}
//                                     >
//                                         {top}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {handleSearch().map((rows) => {
//                                 const profit = rows.price_change_percentage_24h > 0;

//                                 return (
//                                     <TableRow
//                                         onClick={() => history(`/coins/${rows.id}`)}
//                                         className={classes.rows}
//                                         key={rows.name}
//                                     >
//                                         <TableCell
//                                             component="eth" scope="row"
//                                             style={{
//                                                 display:"flex",
//                                                 gap:15,
//                                             }}
//                                         >
//                                             <img
//                                                 src={rows?.image}
//                                                 alt={rows.name}
//                                                 height="50"
//                                                 style={{ marginBottom: 10 }}
//                                             />
//                                             <div
//                                             style={{display:"flex",flexDirection:"column"}}>
//                                                 <span
//                                                     style={{
//                                                         textTransform:"upercase",
//                                                         fontSize:22,                                                        
//                                                     }}
//                                                 >
//                                                     {rows.sym}
//                                                 </span>
//                                                 <span style={{color:"grey"}}>{rows.name}</span>
//                                             </div>
//                                         </TableCell>
//                                     </TableRow>
//                                 );
//                             })}
//                         </TableBody>
//                     </Table>
//                     )
//                 }
//             </TableContainer>
//         </Container>
//     );
// };
// export default coinsTable;




import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { Cryptostate } from "../Cryptocontext";
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Paper, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";

const useStyles = makeStyles(() => ({
    rows: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightgrey',
        },
    },
    pagination:{
        "& .MuiPaginationItem-root":{
            color:"black",
        },
        backgroundColor:"grey",
    }
}));

const CoinsTable = () => {
    const [counts,setCounts]=useState(1);
    const [coins, setCoins] = useState([]);
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState("");

    const { curr ,sym} = Cryptostate();
    const history = useNavigate();
    const classes = useStyles();

    const fetchCoins = async () => {
        setLoad(true);
        try {
            const { data } = await axios.get(CoinList(curr));
            setCoins(data);
        } catch (error) {
            console.error("Error fetching coins:", error);
        } finally {
            setLoad(false);
        }
    };

    useEffect(() => {
        fetchCoins();
    }, [curr]);

    const handleSearch = () => {
        if (!Array.isArray(coins) || typeof search !== 'string') {
            return [];
        }

        const lowerCaseSearch = search.trim().toLowerCase();

        return coins.filter((coin) =>
            (coin.name && coin.name.toLowerCase().includes(lowerCaseSearch)) ||
            (coin.sym && coin.sym.toLowerCase().includes(lowerCaseSearch))
        );
    };

    return (
        <Container style={{ textAlign: "center" }}>
            <Typography 
                variant="h4"
                style={{ margin: 20, fontFamily: "sans-serif" }}
            >
                PriceRadar
            </Typography>
            <TextField
                label="Search For a Crypto Currency"
                variant="outlined"
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
            <TableContainer component={Paper}>
                {load ? (
                    <LinearProgress style={{ backgroundColor: "gold" }} />
                ) : (
                    <Table>
                        <TableHead style={{ backgroundColor: "black" }}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((top) => (
                                    <TableCell
                                        style={{
                                            color: "white",
                                            fontWeight: "900",
                                            fontFamily: "sans-serif",
                                        }}
                                        key={top}
                                        align={top === "Coin" ? "left" : "right"}
                                    >
                                        {top}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                            .slice((counts-1)*10,(counts-1)*10+10)
                            .map((rows) => {
                                const profit = rows.price_change_percentage_24h > 0;

                                return (
                                    <TableRow
                                        onClick={() => history(`/coins/${rows.id}`)}
                                        className={classes.rows}
                                        key={rows.id}
                                    >
                                        <TableCell
                                            component="td"
                                            scope="row"
                                            style={{
                                                display: "flex",
                                                gap: 15,
                                                alignItems: "center",
                                            }}
                                        >
                                            <img
                                                src={rows?.image}
                                                alt={rows.name}
                                                height="50"
                                                style={{ marginBottom: 10 }}
                                            />
                                            <div
                                                style={{ display: "flex", flexDirection: "column" }}
                                            >
                                                <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 22,
                                                    }}
                                                >
                                                    {rows.symbol}
                                                </span>
                                                <span style={{ color: "grey" }}>{rows.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">{sym}{rows.current_price.toFixed(2)}</TableCell>
                                        <TableCell align="right" style={{ color: profit ? "green" : "red" }}>
                                            {rows.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                        {sym}{rows.market_cap.toLocaleString().slice(0,-7)+"M"}
                                            </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <Pagination
            style={{
                padding:15,
                width:"100%",
                display:"flex",
                justifyContent:"center",
            }}
            classes={{ul:classes.pagination}}
            count={(handleSearch()?.length/10).toFixed(0)}
            onChange={(one,value)=>{
                setCounts(value);
                window.scroll(0,450);
            }}
            />
        </Container>
    );
};

export default CoinsTable;
