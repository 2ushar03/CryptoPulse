import { makeStyles } from "@mui/styles";
import React, { Children } from "react";


const useStyles=makeStyles({

});
const SelectButton=({children,selected,onclick})=>{

    const classes=useStyles();
    return (
        <span onClick={onclick} className={classes.selectButton}>
            {children}
        </span>
    )
}

export default SelectButton;