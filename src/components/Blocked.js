import "../lib/css/components/blocked.scss";

function Blocked() {
    return (
        <div
            className="blocked-container"
            style={{ backgroundImage: 'url("/logo192.png")' }}
        >
            <div className="blocked-wrapper">
                <h1>Page Is Currently Unavailable</h1>
                <h3>Check With Us Again Later</h3>
            </div>
        </div>
    );
}

export default Blocked;
