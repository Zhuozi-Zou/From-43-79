import React from "react";
import Button from "@material-ui/core/Button";
import "./styles.css";
import Grid from "@material-ui/core/Grid";

import Header from "../../../Header";
import EditInput from "../../EditInput";
import {addNewQuestion, leaveEdit} from "../../../../actions/Question";
import QuestionFilter from "../QuestionFilter";


/* Component for the EditQuestion page */
class EditQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.app.state.currentUser;
        this.nickName = this.props.app.state.nickName;
        this.state = {
            user: "",
            type: "",
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
            [name]: value
        });
    };

    render() {
        return (
            <div>
                <Header cur="Question" role={this.role}/>

                <h1>Edit your question:</h1>
                <QuestionFilter onChange={this.handleChange} errors={this.state.errors}/>

                <Grid container justify='center' className="questionInput">
                    <div className='input'>
                        <EditInput
                            name="briefInfo"
                            id="briefInfo"
                            value={this.briefInfo}
                            onChange={this.handleChange}
                            label="Brief Introduction"
                            error={this.state.errors.briefInfo}
                            helperText="Please give a brief introduction of your question"
                        />

                        <EditInput
                            name="details"
                            id="details"
                            value={this.state.details}
                            onChange={this.handleChange}
                            label="More details"
                            error={this.state.errors.details}
                            helperText="Writing your question here!"
                        />
                    </div>
                </Grid>

                <div className="editQuestionButtons">
                    <Button
                        className="editQuestion_postButton"
                        onClick={() => addNewQuestion(this)}
                    >
                        Post
                    </Button>

                    <Button
                        className="editQuestion_deleteButton"
                        onClick={() => leaveEdit(this)}
                    >
                        Leave
                    </Button>
                </div>

            </div>
        );
    }
}


export default EditQuestion;