import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import "./styles.css";

import Header from "../../../Header";
import {Link} from "react-router-dom";
import {deleteUser, getUser} from "../../../../actions/userAccount";


/* Component for the UserAccount page */
class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        this.app = this.props.app;
        this.role = this.app.state.role;
        this.username = this.app.state.username;
        this.userId = this.props.history.location.state.userId;
    }

    state = {
        user: {}
    };

    componentDidMount() {
        getUser(this, this.userId);
    }

    render() {
        const { password, _id, status, __v, updatedAt, createdAt, ...user } = this.state.user;

        return (
            <div>
                <Header role={this.role}/>
                <h1>User Account</h1>

                <Grid className="userAccount-fields" container spacing={3}>
                    {Object.entries(user).map(([key, value]) => {
                        if (!(key === "role" || key === "username") || this.role === "admin") {
                            return (
                                <Grid item xl={12} lg={12} md={12} s={12} xs={12} key={"userAccount-" + key}>
                                    <TextField
                                        className="userAccount-info"
                                        label={key}
                                        multiline rowsMax="5"
                                        defaultValue={value}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                            )
                        }
                    })}

                    <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                        <Link className="userAccount__button-link" to={{pathname: "/FindBuddy", id: this.state.user._id}}>
                            <Button className="userAccount__button">View {this.state.user.nickName}'s posts</Button>
                        </Link>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                        <Link className="userAccount__button-link" to={{pathname: "/AskForHelp", id: this.state.user._id}}>
                            <Button className="userAccount__button">View {this.state.user.nickName}'s questions</Button>
                        </Link>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                        <Link className="userAccount__button-link" to={{pathname: "/ShareJournal", id: this.state.user._id}}>
                            <Button className="userAccount__button">View {this.state.user.nickName}'s journals</Button>
                        </Link>
                    </Grid>

                    {this.role === "admin" &&
                    <Grid item xl={12} lg={12} md={12} s={12} xs={12}>
                        <Button className="userAccount__button red" onClick={() => deleteUser(this)}>
                            Delete User
                        </Button>
                    </Grid>}
                </Grid>
            </div>
        );
    }
}


export default UserAccount;