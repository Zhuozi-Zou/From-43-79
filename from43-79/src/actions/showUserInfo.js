import React from "react";

export const toAccountPage = (id, component) => {
        if (id === component.props.app.state.currentUser) {
            component.props.history.push('/MyAccount');
        } else {
            component.props.history.push('/UserAccount', {userId: id});
        }
};
