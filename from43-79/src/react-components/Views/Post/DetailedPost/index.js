import React from "react";
import Button from "@material-ui/core/Button";
import "./styles.css";

import Header from "../../../Header";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { toAccountPage } from "../../../../actions/showUserInfo";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {addNewComment, addNewReply, deletePost} from "../../../../actions/FindBuddy";
import EditInput from "../../EditInput";

const datetime = require('date-and-time');

/* Component for the DetailedPost page */
class DetailedPost extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.app.state.currentUser;
        this.nickName = this.props.app.state.nickName;
        this.role = this.props.app.state.role;
        this.state = {
            commentContent: "",
            replyContent: "",
            open: false,
            post: this.props.history.location.state.post
        };
    }

    handleClickOpen = () => {
        this.setState({["open"]: true});
        this.render();
    };

    handleClose = () => {
        this.setState({["open"]: false});
    };

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div>
                <Header cur="Post" role={this.role}/>
                <h1>Detailed post:</h1>

                <div className="whole_detailed_post">
                <Paper className="post__paper">
                        <div id="postInfo">
                            <p className="first_label">Posted by:
                                <span>
                                    {this.state.post.user.status === "active" ?
                                        <Button className="poster__button" id="poster_name"
                                                onClick={() => toAccountPage(this.state.post.user._id, this)}>
                                            {this.state.post.user.nickName}
                                        </Button>
                                        : <span className="detailContent">(User Has Been Deleted)</span>}
                                </span>
                                <span className="detailContent">  at {
                                    datetime.format(new Date(this.state.post.postTime), 'MMM D YYYY')}
                                </span>
                            </p>
                            <p><span className="first_label">Basic information:</span></p>
                            <div className="basicInfo_detailed_post">
                            <p><span className="label">Time: </span>
                                <span className="detailContent">
                                    Between {datetime.format(new Date(this.state.post.startDate), 'MMM D YYYY')}
                                    {' '} and {datetime.format(new Date(this.state.post.endDate), 'MMM D YYYY')}
                                </span>
                            </p>
                            <p><span className="label">Region: </span>
                                <span className="detailContent">{this.state.post.region.name}</span></p>
                            <p><span className="label">Theme: </span>
                                <span className="detailContent">{this.state.post.theme.name}</span></p>
                            </div>
                            <span id="moreDescription">
                            <p><span className="first_label">Brief Intro: </span></p>
                                <div className="moreInfo_detailed_post"><span className="detailContent">
                                    {this.state.post.briefInfo}</span></div>
                            <p><span className="first_label">More Description: </span></p>
                                <div className="moreInfo_detailed_post"><span className="detailContent">
                                    {this.state.post.details}</span></div>
                            </span>

                        </div>
                </Paper>

                </div>

                {(this.user === this.state.post.user._id || this.role ===  "admin") &&
                <div className="detailedPostButtons">
                    <Button
                        className="editPost_postButton"
                        onClick={() => deletePost(this)}
                    >
                        Delete this Post
                    </Button>
                </div>}

                {this.state.post.comments.length > 0 &&
                <div className="whole_detailed_comments">
                    <p className="first_label">Replies:</p>
                    {this.state.post.comments.map(reply => (
                        <Paper className="post__paper" key={"replies" + reply._id}>
                            <div className="singleReply">
                                {reply.replyTo && <p className="label">Reply To: {reply.replyTo.comment}
                                </p>}
                                <Grid className="reply_comment"><span className="replyContent">
                                    {reply.comment}</span></Grid>
                                <div className="replierInfo">
                                    <p className="label">Replied by:
                                        <span>
                                    {reply.user.status === "active" ?
                                        <Button className="poster__button" id="poster_name"
                                                onClick={() => toAccountPage(reply.user._id, this)}>
                                            {reply.user.nickName}
                                        </Button>
                                        : <span className="detailContent">(User Has Been Deleted)</span>}
                                </span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                                    Reply to this comment
                                </Button>
                                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Enter your reply content:
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            name="replyContent"
                                            className="replyInput"
                                            value={this.replyContent}
                                            onChange={this.handleChange}
                                            fullWidth
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleClose} >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="editComment_postButton"
                                            onClick={() => addNewReply(this, reply)}
                                        >
                                            Reply!
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Paper>
                    ))}
                </div>}

                <div className="add_new_reply">
                    <EditInput
                        name="commentContent"
                        id="replyInput"
                        value={this.commentContent}
                        onChange={this.handleChange}
                        label="Add New Reply"
                    />

                    <div id="replybutton_pos">
                        <Button
                            className="editComment_postButton"
                            onClick={() => addNewComment(this)}
                        >
                            Reply!
                        </Button>
                    </div>
                </div>

            </div>
        );
    }
}


export default DetailedPost;