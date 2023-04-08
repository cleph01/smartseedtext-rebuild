import { useState, forwardRef } from "react";

import Auth from "../components/Auth";

import "../lib/css/pages/login.scss";

import logo from "../assets/logos/logo-text.png";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Login() {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [alertMsg, setAlertMsg] = useState({
        message: "",
        severity: "success",
    });

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };

    return (
        <>
            <div className="container">
                <div className="body-wrapper">
                    <div className="image-wrapper">
                        <img className="logo" src={logo} alt="logo" />
                    </div>

                    <Auth
                        setAlertMsg={setAlertMsg}
                        openSnackBar={openSnackBar}
                    />
                </div>
            </div>
            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        severity={alertMsg.severity}
                        sx={{ width: "100%" }}
                    >
                        {alertMsg.message}
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
}

export default Login;
