import { useState, useRef } from "react";

import { db } from "../services/firebase/firebase-config";

import TextField from "@mui/material/TextField";

import "../lib/css/pages/text.scss";

const businessInfo = {
    logoUrl: "/logo.png",
    website: "https://www.smartseed.agency/",
    navBarColor: "#ffffff",
    backBtnColor: "#55c0da",
};

function DemoText({ user }) {
    const chatRef = useRef();

    const [message, setMessage] = useState({
        message: {
            customerCell: "",
            customerName: "",
            rooferCell: "",
            body: "",
        },
        submitting: false,
        error: false,
        success: false,
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setMessage((prevState) => ({
            ...prevState,
            message: { ...prevState.message, [name]: event.target.value },
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage({ ...message, submitting: true });

        const twilioPayload = {
            to: message.message.rooferCell,
            body: `New Message from Contact Form: Customer Name: ${message.message.customerName} - ${message.message.body} - Call them @ : ${message.message.customerCell}`,
            repId: user.userId,
            displayName: user.displayName,
            demo: true,
        };

        const chat = document.getElementsByClassName("chat")[0];

        chat.innerHTML +=
            "<div class='yours messages'><div class='message last'>" +
            message.message.body +
            "</div></div><div id='sending' class='mine messages'><div class='message last'>Sending Your Message...</div></div>";

        db.collection("textMessages")
            .add(twilioPayload)
            .then((docRef) => {
                setMessage({ ...message, submitting: false, success: true });
                const sendingEl = document.getElementById("sending");

                sendingEl.remove();

                chat.innerHTML +=
                    "<div class='mine messages'><div class='message last'>Your message has successfully been sent!! 🙌  Someone will be in touch with you shortly. 💯</div></div>";

                // Refocus to chat window
                chatRef.current.focus();

                // Reset Message Fields, Keeping Roofer # intact
                setMessage((prevState) => ({
                    ...prevState,
                    message: {
                        ...prevState.message,
                        customerCell: "",
                        customerName: "",
                        body: "",
                        rooferName: "",
                    },
                }));
            })
            .catch((error) => {
                console.log("Error Creating New text message: ", error);

                setMessage({ ...message, submitting: false, error: true });

                chat.innerHTML +=
                    "<div class='mine messages'><div class='message last'>There was an error sending your message !! 😟 Please Call us at " +
                    businessInfo.businessCell +
                    "</div></div>";

                // Refocus to chat window
                chatRef.current.focus();
            });
    };

    console.log("User State: ", user);
    return (
        <>
            <div className="text-container">
                <div className="chat-container">
                    <header>
                        <h2>Demo Text Message Contact Form</h2>

                        <div className="input-wrapper">
                            <TextField
                                className="input"
                                label="Demo Customer Name"
                                type="text"
                                name="customerName"
                                placeholder="Enter Customer Name"
                                value={message.message.customerName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-wrapper">
                            <TextField
                                className="input"
                                type="tel"
                                label="Demo Customer Number"
                                name="customerCell"
                                id="cellphone"
                                placeholder="NO Spaces, Dashes, or Parantheses"
                                value={message.message.customerCell}
                                onChange={handleChange}
                                inputProps={{ maxLength: 10 }}
                            />
                        </div>
                        <div className="input-wrapper">
                            <TextField
                                className="input"
                                type="tel"
                                label="The Cell # To Receive Test"
                                name="rooferCell"
                                id="cellphone"
                                placeholder="NO Spaces, Dashes, or Parantheses"
                                value={message.message.rooferCell}
                                onChange={handleChange}
                                inputProps={{ maxLength: 10 }}
                            />
                        </div>
                        <div className="input-wrapper">
                            <TextField
                                id="msg"
                                className="msg-input"
                                label="Your Message"
                                variant="outlined"
                                name="body"
                                placeholder="Enter Message (100 Characters Max)"
                                value={message.message.body}
                                onChange={handleChange}
                                inputProps={{ maxLength: 100 }}
                                multiline
                            />
                        </div>

                        <div
                            className="send-button"
                            id="twilio-contact-form-submit"
                            onClick={handleSubmit}
                        >
                            Send
                        </div>
                    </header>
                    <div className="chat">
                        <div className="mine messages">
                            <div className="message">
                                Welcome to Valley Roofing and Siding! Send us a
                                text message below and we will get in touch with
                                you shortly.
                            </div>
                            <div className="message last">
                                Include your name and your Cellphone number.
                            </div>
                        </div>
                    </div>

                    <div className="footer" ref={chatRef}>
                        <p className="signature">
                            Powered by SmartSeed Technologies
                        </p>
                        <p>Copyright &copy; 2021</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DemoText;
