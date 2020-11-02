import React from "react";
import Button from "@material-ui/core/Button";
import "./styles.css";
import Grid from "@material-ui/core/Grid";

import Header from "../../../Header";
import EditInput from "../../EditInput";
import {addNewPost, leaveEdit} from "../../../../actions/FindBuddy";
import PostFilter from "../PostFilter";

const datetime = require('date-and-time');


/* Component for the EditPost page */
class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.app.state.currentUser;
        this.nickName = this.props.app.state.nickName;
        this.state = {
            user: "",
            type: "",
            start: new Date(),
            end: datetime.addYears(new Date(), 1),
            region: "",
            theme: "",
            briefInfo: "",
            details: "",
            errors: {
                type: false,
                region: false,
                theme: false,
                briefInfo: false,
                details: false
            }
        };
    }

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <div>
                <Header state={this.prevState}/>

                <h1>Edit your post:</h1>
                <PostFilter onChange={this.handleChange} role={this.role} errors={this.state.errors}
                            dates={[this.state.start, this.state.end]}/>

                <Grid container justify="center" className="postInput">
                    <div className='input'>
                        <EditInput
                            name="briefInfo"
                            id="briefInfo"
                            value={this.state.briefInfo}
                            onChange={this.handleChange}
                            label="Brief Introduction"
                            error={this.state.errors.briefInfo}
                            helperText="Please give a brief introduction of your post"
                        />

                        <EditInput
                            name="details"
                            id="details"
                            value={this.state.details}
                            onChange={this.handleChange}
                            label="More details"
                            error={this.state.errors.details}
                            helperText="Writing your post here!"
                        />
                    </div>
                </Grid>

                <div className="editPostButtons">
                    <Button
                        className="editPost_postButton"
                        onClick={() => addNewPost(this)}
                    >
                        Post
                    </Button>

                    <Button
                        className="editPost_deleteButton"
                        onClick={() => leaveEdit(this)}
                    >
                        Leave
                    </Button>

                </div>


            </div>
        );
    }
}


export default EditPost;