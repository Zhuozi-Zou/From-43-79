import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./styles.css";

import Header from "../../../Header";
import QuestionFilter from "../QuestionFilter";
import {findMyQuestions, findQuestions, getAllQuestions, viewQuestions, resetFilters} from "../../../../actions/Question";
import {editFilters} from "../../../../actions/filter";

/* Component for the AskForHelp page */
class AskForHelp extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.app.state.currentUser;
        this.id = this.props.history.location.id ? this.props.history.location.id: 'all';
        this.role = this.props.app.state.role;
        this.state = {
            user: this.user,
            questions: [],
            view: [],
            filters: ['All', 'All', 'All'],
            errors: {
                type: false,
                region: false,
                theme: false,
            }
        };
    }

    componentDidMount() {
        getAllQuestions(this, this.id);
    }

    handleChange = event => {
        findQuestions(this, event.target.name, event.target.value);
    };

    render() {
        return (
            <div>
                <Header cur="Question" role={this.role}/>

                <QuestionFilter onChange={this.handleChange} role={this.role} errors={this.state.errors}/>

                <div className="question-buttons">
                    <Link className="question__button-link" to="/EditQuestion">
                        <Button className="question__button">Ask a Question</Button>
                    </Link>
                    <Button className="question__button"
                            onClick={ () => findMyQuestions(this) }>
                        View My Questions
                    </Button>
                    <Button className="question__button"
                            onClick={ () => resetFilters(this) }>
                        Reset Filters
                    </Button>
                    {this.role === 'admin' &&
                    <Button className="post__button"
                            onClick={ () => editFilters(this, 'question') }>
                        Edit Filters
                    </Button>}
                </div>

                <div className="questions">
                    {this.state.view.map(question => (
                        <Grid container justify="center" className="question" key={question.id}>
                            <Paper className="question__paper">
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1">
                                                Posted by: {question.user.nickName}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Type: {question.type.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Tags: {question.region.name}, {question.theme.name}
                                            </Typography>
                                            <Typography variant="body1" className="journal__details" gutterBottom>
                                                {question.briefInfo}
                                            </Typography>
                                        </Grid>

                                        <Grid item className="details">
                                            <Button className="details__button"
                                                    onClick={ () => viewQuestions(this, question)}>
                                                View Details
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))}
                </div>

            </div>
        );
    }
}


export default AskForHelp;