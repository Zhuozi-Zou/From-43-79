import React from "react";
import Button from "@material-ui/core/Button";
import "./styles.css";

import Header from "../../../Header";
import Paper from "@material-ui/core/Paper";
import {toAccountPage} from "../../../../actions/showUserInfo";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {addNewComment, addNewReply, deleteJournal} from "../../../../actions/Journal";
import EditInput from "../../EditInput";

const datetime = require('date-and-time');

/* Component for the DetailedJournal page */
class DetailedJournal extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.app.state.currentUser;
        this.nickName = this.props.app.state.nickName;
        this.role = this.props.app.state.role;
        this.state = {
            commentContent: "",
            replyContent: "",
            open: false,
            journal: this.props.history.location.state.journal
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
                <Header cur="Journal" role={this.role}/>

                <h1>Detailed Journal:</h1>

                <div className="whole_detailed_journal">
                    <Paper className="post__paper">
                        <div id="journalInfo">
                            <p className="first_label">Posted by:
                                <span>
                                    {this.state.journal.user.status === "active" ?
                                        <Button className="poster__button" id="poster_name"
                                                onClick={() => toAccountPage(this.state.journal.user._id, this)}>
                                            {this.state.journal.user.nickName}
                                        </Button>
                                        : <span className="detailContent">(User Has Been Deleted)</span>}
                                </span>
                                <span className="detailContent">  at {
                                    datetime.format(new Date(this.state.journal.postTime), 'MMM D YYYY')}
                                </span>
                            </p>
                            <p><span className="first_label">Basic information:</span></p>
                            <div className="basicInfo_detailed_post">
                                <p><span className="label">Time: </span>
                                    <span className="detailContent">
                                        Between {datetime.format(new Date(this.state.journal.startDate), 'MMM D YYYY')}
                                        {' '} and {datetime.format(new Date(this.state.journal.endDate), 'MMM D YYYY')}
                                    </span></p>
                                <p><span className="label">Region: </span>
                                    <span className="detailContent">{this.state.journal.region.name}</span></p>
                                <p><span className="label">Theme: </span>
                                    <span className="detailContent">{this.state.journal.theme.name}</span></p>
                            </div>
                            <span id="moreDescription">
                            <p><span className="first_label">Brief Intro: </span></p>
                                <div className="moreInfo_detailed_post">
                                    <span className="detailContent">{this.state.journal.briefInfo}</span></div>
                            <p><span className="first_label">More Description: </span></p>
                                <div className="moreInfo_detailed_post">
                                    <span className="detailContent">{this.state.journal.details}</span></div>
                            </span>
                        </div>
                    </Paper>
                </div>

                {(this.user === this.state.journal.user._id || this.role ===  "admin") &&
                <div className="detailedJournalButtons">
                    <Button
                        className="editJournal_deleteButton"
                        onClick={() => deleteJournal(this)}
                    >
                        Delete this Journal
                    </Button>
                </div>}

                {this.state.journal.comments.length > 0 &&
                <div className="whole_detailed_comments">
                    <p className="first_label">Replies:</p>
                    {this.state.journal.comments.map(reply => (
                        <Paper className="post__paper" key={"replies" + reply._id}>
                            <div className="singleReply">
                                {reply.replyTo && <p className="label">Reply To: {reply.replyTo.comment}
                                </p>}
                                <Grid className="reply_comment"><span className="replyContent">{reply.comment}</span></Grid>
                                <div className="replierInfo">
                                    <p className="label">Replied by:
                                        <span>
                                    <span>
                                     {reply.user.status === "active" ?
                                         <Button className="poster__button" id="poster_name"
                                                 onClick={() => toAccountPage(reply.user._id, this)}>
                                             {reply.user.nickName}
                                         </Button>
                                         : <span className="detailContent">(User Has Been Deleted)</span>}
                                </span>
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


export default DetailedJournal;