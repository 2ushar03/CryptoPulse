// import React, { useEffect, useState } from "react";
// import { Cryptostate } from "../Cryptocontext";
// import { HistoricalChart } from "../config/api";
// import axios from "axios";
// import { makeStyles } from "@mui/styles";
// import { CircularProgress } from "@mui/material";
// import { Line } from "react-chartjs-2";
// import { DaysChart } from "../config/data";
// import {
//     Chart as ChartJS,
//     LineElement,
//     PointElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend
// } from "chart.js";

// ChartJS.register(
//     LineElement,
//     PointElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend
// );

// const useStyles = makeStyles(() => ({
//     container: {
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent:"center",
//         marginTop: 25,
//         padding: 40,
//         // [theme.breakPoints.down("md")]:{
//             // width:"100%",
//             // marginTop:0,
//             // padding:20,
//             // paddingTop:0
//         // }
//     },
// }));

// const CoinInfo = ({ coin }) => {
//     const [hist, setHist] = useState();
//     const [day, setDays] = useState(1);
//     const { curr, sym } = Cryptostate();

//     const fetchHistData = async () => {
//         const { data } = await axios.get(HistoricalChart(coin.id, day, curr));
//         setHist(data.prices);
//     };

//     useEffect(() => {
//         fetchHistData();
//     }, [curr, day, coin.id]);

//     const classes = useStyles();

//     return (
//         <div>
//             <div className={classes.container}>
//                 {!hist ? (
//                     <CircularProgress 
//                         style={{ color: "grey" }}
//                         size={250}
//                         thickness={1}
//                     />
//                 ) : (
//                     <Line
//                         data={{
//                             labels: hist.map((coin) => {
//                                 const dte = new Date(coin[0]);
//                                 const tme = dte.getHours() > 12
//                                     ? `${dte.getHours() - 12}:${dte.getMinutes()}PM`
//                                     : `${dte.getHours()}:${dte.getMinutes()}AM`;
//                                 return day === 1 ? tme : dte.toLocaleDateString();
//                             }),
//                             datasets: [{
//                                 data: hist.map((coin) => coin[1]),
//                                 label: `Price (Past ${day} Days) in ${curr}`,
//                                 borderColor: "yellow",
//                             }],
//                         }}
//                         options={{
//                             elements: {
//                                 point: {
//                                     radius: 1,
//                                 },
//                             },
//                         }}
//                     />
//                 )}
//             </div>
//             <div
//                 style={{
//                     display:"flex",
//                     marginTop:20,
//                     justifyContent:"space-around",
//                     width:"100%"
//                 }}
//             >
//                 {DaysChart.map(dayval => (
//                      <button
//                         key={dayval.value}
//                         onClick={() => setDays(dayval.value)}
//                         selected={dayval.value === day}
//                     >
//                         {dayval.label}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CoinInfo;



import React, { useEffect, useState } from "react";
import { Cryptostate } from "../Cryptocontext";
import { HistoricalChart } from "../config/api";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import { DaysChart } from "../config/data";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const useStyles = makeStyles(() => ({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        backgroundColor: "lightgray",
    },
    buttonContainer: {
        display: "flex",
        marginTop: 20,
        justifyContent: "space-around",
        width: "100%",
    },
    button: {
        backgroundColor: "#007bff", // Bootstrap blue
        color: "white",
        border: "none",
        borderRadius: 5,
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: 16,
        transition: "background-color 0.3s",
    },
    buttonSelected: {
        backgroundColor: "#0056b3",
    },
}));

const CoinInfo = ({ coin }) => {
    const [hist, setHist] = useState();
    const [day, setDays] = useState(1);
    const { curr } = Cryptostate();
    const classes = useStyles();

    const fetchHistData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, day, curr));
        setHist(data.prices);
    };

    useEffect(() => {
        fetchHistData();
    }, [curr, day, coin.id]);

    return (
        <div>
            <div className={classes.container}>
                {!hist ? (
                    <CircularProgress style={{ color: "grey" }} size={250} thickness={1} />
                ) : (
                    <Line
                        data={{
                            labels: hist.map((coin) => {
                                const dte = new Date(coin[0]);
                                const tme = dte.getHours() > 12
                                    ? `${dte.getHours() - 12}:${dte.getMinutes()} PM`
                                    : `${dte.getHours()}:${dte.getMinutes()} AM`;
                                return day === 1 ? tme : dte.toLocaleDateString();
                            }),
                            datasets: [{
                                data: hist.map((coin) => coin[1]),
                                label: `Price (Past ${day} Days) in ${curr}`,
                                borderColor: "yellow",
                            }],
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                },
                            },
                        }}
                    />
                )}
            </div>
            <div className={classes.buttonContainer}>
                {DaysChart.map(dayval => (
                    <button
                        key={dayval.value}
                        onClick={() => setDays(dayval.value)}
                        className={`${classes.button} ${dayval.value === day ? classes.buttonSelected : ''}`}
                    >
                        {dayval.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CoinInfo;
