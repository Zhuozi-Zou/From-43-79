import React from "react";
import "./styles.css";
import {InputLabel, Select} from "@material-ui/core";
import {getTags} from "../../../../actions/filter";


/* Component for the QuestionFilter page */
class QuestionFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [],
            region: [],
            theme: []
        };
    }

    componentDidMount() {
        getTags(this, 'question');
    }

    render() {
        const {onChange, errors} = this.props;
        return (
            <div className="questionFilter">
                <div className="type">
                    <InputLabel>Type</InputLabel>
                    <Select defaultValue="" displayEmpty id="typeSelector" onChange={onChange} name="type"
                            error={errors.type}>
                        <option value="">All</option>
                        {this.state.type.map(tag => {
                            if (tag.status === 'active') {
                                return (<option value={tag._id}>{tag.name}</option>)
                            }
                        })}
                    </Select>

                </div>

                <div className="region">
                    <InputLabel>Region</InputLabel>
                    <Select defaultValue="" displayEmpty id="regionSelector" onChange={onChange} name="region"
                            error={errors.region}>
                        <option value="">All</option>
                        {this.state.region.map(tag => {
                            if (tag.status === 'active') {
                                return (<option value={tag._id}>{tag.name}</option>)
                            }
                        })}
                    </Select>

                </div>

                <div className="theme">
                    <InputLabel>Theme</InputLabel>
                    <Select defaultValue="" displayEmpty id="themeSelector" onChange={onChange} name="theme"
                            error={errors.theme}>
                        <option value="">All</option>
                        {this.state.theme.map(tag => {
                            if (tag.status === 'active') {
                                return (<option value={tag._id}>{tag.name}</option>)
                            }
                        })}
                    </Select>
                </div>


            </div>
        );
    }
}

export default QuestionFilter;