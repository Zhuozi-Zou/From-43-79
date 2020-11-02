import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import './App.css';

import Login from "./react-components/Views/Login";
import ChangePassword from "./react-components/Views/Account/ChangePassword";
import FindBuddy from './react-components/Views/Post/FindBuddy';
import AskForHelp from "./react-components/Views/Question/AskForHelp";
import ShareJournal from "./react-components/Views/Journal/ShareJournal";
import MyAccount from "./react-components/Views/Account/MyAccount";
import EditMyAccount from "./react-components/Views/Account/EditMyAccount";
import UserAccount from "./react-components/Views/Account/UserAccount";
import DetailedJournal from "./react-components/Views/Journal/DetailedJournal";
import DetailedQuestion from "./react-components/Views/Question/DetailedQuestion";
import DetailedPost from "./react-components/Views/Post/DetailedPost";
import EditJournal from "./react-components/Views/Journal/EditJournal";
import EditPost from "./react-components/Views/Post/EditPost";
import EditQuestion from "./react-components/Views/Question/EditQuestion";
import ViewUsers from "./react-components/Views/Users";
import EditFilters from "./react-components/Views/EditFilters";
import SignUp from "./react-components/Views/SignUp";

const {readCookie} = require("../../from43-79/src/actions/login");

class App extends React.Component{
    constructor(props) {
        super(props);
        readCookie(this); // sees if a user is logged in.
    }

    // global state passed down includes the current logged in user.
    state = {
        currentUser: null,
        username: null,
        nickName: null,
        role: null,
        render: false
    };

    render() {
        const { currentUser, render } = this.state;

        return (
            <BrowserRouter>
                {render &&
                <Switch>
                    <Route exact path="/" component={({history}) => <Login history={history} app={this}/>}/>
                    <Route exact path="/SignUp" component={({history}) => <SignUp history={history} app={this}/>}/>
                    <Route exact path="/ChangePassword" component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <ChangePassword history={history} app={this}/>
                        )}/>
                    <Route exact path="/FindBuddy" component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <FindBuddy history={history} app={this}/>
                        )}/>
                    <Route exact path='/AskForHelp' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <AskForHelp history={history} app={this}/>
                        )}/>
                    <Route exact path='/ShareJournal' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <ShareJournal history={history} app={this}/>
                        )}/>
                    <Route exact path='/ViewUsers' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <ViewUsers history={history} app={this}/>
                        )}/>
                    <Route exact path='/EditFilters' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <EditFilters history={history} app={this}/>
                        )}/>
                    <Route exact path='/MyAccount' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <MyAccount history={history} app={this}/>
                        )}/>
                    <Route exact path='/EditMyAccount' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <EditMyAccount history={history} app={this}/>
                        )}/>
                    <Route exact path='/UserAccount' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <UserAccount history={history} app={this}/>
                        )}/>
                    <Route exact path='/DetailedJournal' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <DetailedJournal history={history} app={this}/>
                        )}/>
                    <Route exact path='/DetailedQuestion' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <DetailedQuestion history={history} app={this}/>
                        )}/>
                    <Route exact path='/DetailedPost' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <DetailedPost history={history} app={this}/>
                        )}/>
                    <Route exact path='/EditJournal' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <EditJournal history={history} app={this}/>
                        )}/>
                    <Route exact path='/EditPost' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <EditPost history={history} app={this}/>
                        )}/>
                    <Route exact path='/EditQuestion' component={({history}) => (
                        !currentUser ? <Login history={history} app={this}/> : <EditQuestion history={history} app={this}/>
                        )}/>

                    { /* 404 if URL isn't expected. */}
                    <Route render={() => <div>404 Not found</div>} />
                </Switch>}
            </BrowserRouter>
        )
    }
}

export default App;
