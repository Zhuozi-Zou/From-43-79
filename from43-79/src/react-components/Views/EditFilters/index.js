import React from "react";
import MaterialTable from 'material-table';
import "./styles.css";

import Header from "../../Header";
import {getTags, addNewTag, updateTag} from "../../../actions/filter";

class EditFilters extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.app.state.currentUser;
        this.role = this.props.app.state.role;
        this.page = this.props.history.location.state.page;
        this.state = {
            user: this.user,
            page: this.page,
            type: [],
            region: [],
            theme: []
        };
    }

    componentDidMount() {
        getTags(this, this.page);
    }

    render() {
        const pageName = this.page === 'post' ? 'Find Buddy' : (this.page === 'question' ? 'Ask for Help' : 'Share Journal');
        return (
            <div>
                <Header cur="viewUsers" role={this.role}/>

                {this.role === 'user' &&
                <h1>Sorry, you do not have permission to view this page.</h1>}

                {this.role === 'admin' &&
                <div>
                    <h1>Edit Filters for {pageName}</h1>
                    <div className='filters'>
                        <MaterialTable
                            title="Type"
                            columns={[
                                { title: 'id', field: '_id', hidden: true},
                                { title: 'Name', field: 'name' },
                                { title: 'Status', field: 'status', editable: 'onUpdate',
                                    lookup: {'active': 'active', 'unavail': 'unavailable'}}
                            ]}
                            data={this.state.type}
                            editable={{
                                onRowAdd: newData => {
                                    return addNewTag(this, this.page, 'type', newData.name);
                                },
                                onRowUpdate: (newData, oldData) => {
                                    const ids = this.state.type.map(val => {
                                        return val._id;
                                    });
                                    const index = ids.indexOf(oldData._id);
                                    return updateTag(this, newData._id, 'type', index, newData.name, newData.status)
                                }
                            }}
                        />
                    </div>
                    <div className='filters'>
                        <MaterialTable
                            title="Region"
                            columns={[
                                { title: 'id', field: '_id', hidden: true},
                                { title: 'Name', field: 'name' },
                                { title: 'Status', field: 'status', editable: 'onUpdate',
                                    lookup: {'active': 'active', 'unavail': 'unavailable'}}
                            ]}
                            data={this.state.region}
                            editable={{
                                onRowAdd: newData => {
                                    return addNewTag(this, this.page, 'region', newData.name);
                                },
                                onRowUpdate: (newData, oldData) => {
                                    const ids = this.state.region.map(val => {
                                        return val._id;
                                    });
                                    const index = ids.indexOf(oldData._id);
                                    return updateTag(this, newData._id, 'region', index, newData.name, newData.status)
                                }
                            }}
                        />
                    </div>
                    <div className='filters'>
                        <MaterialTable
                            title="Theme"
                            columns={[
                                { title: 'id', field: '_id', hidden: true},
                                { title: 'Name', field: 'name' },
                                { title: 'Status', field: 'status', editable: 'onUpdate',
                                    lookup: {'active': 'active', 'unavail': 'unavailable'}}
                            ]}
                            data={this.state.theme}
                            editable={{
                                onRowAdd: newData => {
                                    return addNewTag(this, this.page, 'theme', newData.name);
                                },
                                onRowUpdate: (newData, oldData) => {
                                    const ids = this.state.theme.map(val => {
                                        return val._id;
                                    });
                                    const index = ids.indexOf(oldData._id);
                                    return updateTag(this, newData._id, 'theme', index, newData.name, newData.status)
                                }
                            }}
                        />
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default EditFilters;
