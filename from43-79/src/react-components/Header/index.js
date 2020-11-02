import React from "react";
import "./styles.css";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const logo = require("./static/logo.png");


/* The Header Component */
class Header extends React.Component {

    render() {
        const {cur, role} = this.props;
        return (
            <div className="banner">
                <div className="header">
                    <div className="header-logo">
                        <img className="logo-image" src={logo} alt=""/>
                    </div>

                    <div className="header-buttons">
                        <Link className="header__button-link" to="/FindBuddy">
                            <Button className={cur === "FindBuddy" ? "cur__button" : "header__button"}>
                                Find Buddy
                            </Button>
                        </Link>

                        <Link className="header__button-link" to="/AskForHelp">
                            <Button className={cur === "Question" ? "cur__button" : "header__button"}>
                                Ask For Help
                            </Button>
                        </Link>

                        <Link className="header__button-link" to="/ShareJournal">
                            <Button className={cur === "Journal" ? "cur__button" : "header__button"}>
                                Share Journal
                            </Button>
                        </Link>

                        <Link className="header__button-link" to="/MyAccount">
                            <Button className={cur === "Account" ? "cur__button" : "header__button"}>
                                My Account
                            </Button>
                        </Link>

                        {role === 'admin' &&
                        <Link className="header__button-link" to="/ViewUsers">
                            <Button className={cur === "ViewUsers" ? "cur__button" : "header__button"}>
                                View Users
                            </Button>
                        </Link>}
                    </div>
                </div>
            </div>
        );
    }
}


export default Header;