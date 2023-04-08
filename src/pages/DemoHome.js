import { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import DemoNavBar from "../components/DemoNavBar";

import Text from "./DemoText";

import UnauthorizedUser from "../components/UnauthorizedUser";

import { UserContext } from "../contexts/UserContext";

import { db } from "../services/firebase/firebase-config";

import "../lib/css/pages/demo-home.scss";

function Demo({ authUser }) {
    const { userState, userDispatch } = useContext(UserContext);
    const [user, setuser] = useState(null);

    useEffect(() => {
        // Try and Refactor with Async/Await

        // Check if User Exists

        if (!userState.userId) {
            db.collection("users")
                .doc(authUser.uid)
                .get()
                .then((user) => {
                    // If User exists,
                    //Set User Context with Reducer

                    if (user.exists) {
                        userDispatch({
                            type: "USER/SET_EXISTING_USER",
                            payload: {
                                userId: user.id,
                                role: user.data().role,
                                displayName: user.data().displayName,
                                authorized: user.data().authorized,
                            },
                        });

                        setuser(user);
                    } else {
                        // If doesn't Exist, Create New User and set State with Reducer
                        // set with authorized '0'

                        const newUserData = {
                            displayName: authUser.email,
                            avatarUrl: authUser.photoURL,
                            role: "0",
                            email: authUser.email,
                            phoneNumber: authUser.phoneNumber,
                            timestamp: Date.now(),
                            userId: authUser.uid,
                            authorized: false,
                        };

                        db.collection("users")
                            .doc(authUser.uid)
                            .set(newUserData)
                            .then((docRef) => {
                                userDispatch({
                                    type: "USER/CREATE_NEW_USER",
                                    payload: newUserData,
                                });

                                console.log(
                                    "Created User with Id: ",
                                    authUser.uid
                                );

                                setuser({
                                    salespersonId: authUser.uid,
                                    authorized: false,
                                });
                            })
                            .catch((error) => {
                                console.log("Error Creating New User: ", error);
                            });
                    }
                })
                .catch((error) => {
                    console.log("Error Checking User Exists: ", error);
                });
        }
    }, []);

    console.log("UserState at Demo: ", userState);
    return (
        <div
            className="landing-container"
            style={{ backgroundImage: 'url("/logo192.png")' }}
        >
            {userState.authorized && <DemoNavBar user={userState} />}
            {!userState.authorized && <UnauthorizedUser />}

            <Route path="/demo/text">
                <Text />
            </Route>
        </div>
    );
}

export default Demo;
