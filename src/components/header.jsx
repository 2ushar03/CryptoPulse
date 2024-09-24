import React from "react";
import { AppBar, Container, MenuItem, Toolbar, Select, Button, Typography, createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router";
import { Cryptostate } from "../Cryptocontext";

const Header = () => {
    const navigate = useNavigate();
    const { curr, sym, setCurr } = Cryptostate();
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"pink",
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography onClick={() => navigate('/')} style={{ fontWeight:'bold'}}>
                        CryptoPulse
                    </Typography>
                    <Select 
                        value={curr}
                        onChange={(val) => setCurr(val.target.value)}
                        sx={{                                                
                            marginLeft: '82%',
                            paddingRight:"30px",
                        }}
                    >
                        <MenuItem value="INR" >INR</MenuItem>
                        <MenuItem value="USD" >USD</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    );
};

export default Header;
