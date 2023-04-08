import "../lib/css/components/nav-bar.scss";

function NavBar({ businessInfo }) {
    return (
        <div
            className="navbar-container"
            style={{ backgroundColor: businessInfo.navBarColor, zIndex: "100" }}
        >
            <div className="logo-wrapper">
                <img className="logo" src={businessInfo.logoUrl} alt="logo" />
            </div>
            <div className="navbar__body">
                <div className="nav__btn">
                    <a
                        href={businessInfo.website}
                        style={{
                            color: businessInfo.backBtnColor,
                            fontWeight: "700",
                        }}
                    >
                        Go Back
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
