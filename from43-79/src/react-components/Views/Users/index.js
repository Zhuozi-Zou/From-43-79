import React from "react";
import MaterialTable from 'material-table';
import "./styles.css";

import Header from "../../Header";
import {getAllUsers} from "../../../actions/viewUsers";
import { toAccountPage } from "../../../actions/showUserInfo";

class ViewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.app.state.currentUser;
        this.role = this.props.app.state.role;
        this.username = this.props.app.state.username;
        this.state = {
            user: this.user,
            username: this.username,
            users: [],
            columns: [
                { title: "id", field: '_id', hidden: true},
                { title: 'Username', field: 'username' },
                { title: 'Role', field: 'role' },
                { title: 'Nickname', field: 'nickName' },
                { title: 'Contact', field: 'contact' }
            ]
        };
    }

    componentDidMount() {
        getAllUsers(this);
    }

    render() {
        return (
            <div>
                <Header cur="ViewUsers" role={this.role}/>

                {this.role === 'user' &&
                <h1>Sorry, you do not have permission to view this page.</h1>}

                {this.role === 'admin' &&
                <div>
                    <h1>View All Users</h1>
                    <div className='table'>
                        <MaterialTable
                            title="All Users"
                            columns={this.state.columns}
                            data={this.state.users}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'View User',
                                    onClick: (event, rowData) => toAccountPage(rowData._id, this)
                                }
                            ]}
                        />
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default ViewUsers;
