import "../lib/css/components/unauthorized-user.scss";

function UnauthorizedUser() {
    return (
        <div
            className="unauthorized-container"
            style={{ backgroundImage: 'url("/logo192.png")' }}
        >
            <div className="unauthorized-wrapper">
                <h1>Unauthorized User Detected</h1>
                <h3>Contact Support Desk</h3>
            </div>
        </div>
    );
}

export default UnauthorizedUser;
