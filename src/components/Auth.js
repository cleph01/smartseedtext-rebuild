import { useState } from "react";

import { firebase } from "../services/firebase/firebase-config";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Auth() {
    const [loadingUser, setLoadingUser] = useState(false);

    if (loadingUser) {
        return (
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        );
    }
    return <div>Login</div>;
}

export default Auth;
