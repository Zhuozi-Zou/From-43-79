import React from "react";
import Button from "@material-ui/core/Button";
import "./styles.css";
import Grid from "@material-ui/core/Grid";

import Header from "../../../Header";
import Paper from "@material-ui/core/Paper";
import {toAccountPage} from "../../../../actions/showUserInfo";
import {addNewComment, addNewReply, deleteQuestion} from "../../../../actions/Question";
import EditInput from "../../EditInput";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const datetime = require('date-and-time');

/* Component for the DetailedQuestion page */
class DetailedQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.app.state.currentUser;
        this.nickName = this.props.app.state.nickName;
        this.role = this.props.app.state.role;
        this.state = {
            commentContent: "",
            replyContent: "",
            open: false,
            question: this.props.history.location.state.question
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

    render(){
        return (
            <div>
                <Header cur="Question" role={this.role}/>

                <h1>Detailed question:</h1>

                <div className="whole_detailed_question">
                    <Paper className="post__paper">
                        <div id="questionInfo">
                            <p className="first_label">Posted by:
                                <span>
                                    {this.state.question.user.status === "active" ?
                                        <Button className="poster__button" id="poster_name"
                                                onClick={() => toAccountPage(this.state.question.user._id, this)}>
                                            {this.state.question.user.nickName}
                                        </Button>
                                        : <span className="detailContent">(User Has Been Deleted)</span>}
                                </span>
                                <span className="detailContent">  at {
                                    datetime.format(new Date(this.state.question.postTime), 'MMM D YYYY')}
                                </span>
                            </p>
                            <p><span className="first_label">Basic information:</span></p>
                            <div className="basicInfo_detailed_post">
                                <p><span className="label">Region: </span>
                                    <span className="detailContent">{this.state.question.region.name}</span></p>
                                <p><span className="label">Theme: </span>
                                    <span className="detailContent">{this.state.question.theme.name}</span></p>
                            </div>
                            <span id="moreDescription">
                            <p><span className="first_label">Brief Intro: </span></p>
                                <div className="moreInfo_detailed_post"><span className="detailContent">
                                    {this.state.question.briefInfo}</span></div>
                            <p><span className="first_label">More Description: </span></p>
                                <div className="moreInfo_detailed_post"><span className="detailContent">
                                    {this.state.question.details}</span></div>
                            </span>

                        </div>
                    </Paper>

                </div>

                {(this.user === this.state.question.user._id || this.role === "admin") &&
                <div className="detailedQuestionButtons">
                    <Button
                        className="Question_deleteButton"
                        onClick={() => deleteQuestion(this)}
                    >
                        Delete this Question
                    </Button>
                </div>}

                {this.state.question.comments.length > 0 &&
                <div className="whole_detailed_comments">
                    <p className="first_label">Replies:</p>
                    {this.state.question.comments.map(reply => (
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


export default DetailedQuestion;