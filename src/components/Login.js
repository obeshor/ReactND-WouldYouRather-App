import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {handleGetUsers} from '../actions/users';
import {handleLoginUser} from '../actions/auth';
import LoadingBar from "react-redux-loading";
import { Button, Box } from '@material-ui/core';

class Login extends Component {
    state = {
        userSelected: ''
    };

    componentDidMount() {
        this.props.dispatch(handleGetUsers());
    }

    handleChange = (e) => {
        const userSelected = e.target.value;

        this.setState(() => ({
            userSelected
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {dispatch} = this.props;

        dispatch(handleLoginUser(this.state.userSelected));
    };

    render() {
        if (this.props.loading === true || !this.props.users) {
            return <div/>;
        }

        const {from} = this.props.location.state || {from: {pathname: '/'}};

        if (this.props.isAuthed) {
            return <Redirect to={from}/>;
        }

        return (
        <div>
            <LoadingBar />
            <Box width='500px' margin='auto' mt={25} textAlign='center'>
                <h1>Login Form</h1>
                <div>
                    <h2>Login</h2>
                    <p>Please select a user to log in as.</p>
                </div>
                <form id="Login">
                    <Box my={2}>
                        <select id="userId"
                            onChange={(e) => this.handleChange(e)}>
                            <option></option>
                            {
                                Object.keys(this.props.users).map((user) => {
                                    return <option key={this.props.users[user].id}
                                        value={this.props.users[user].id}>{this.props.users[user].name}</option>
                                })
                            }
                        </select>
                    </Box>
                    <Button onClick={this.handleSubmit} variant='outlined' color='secondary' disabled={this.state.userSelected === ''}>Login</Button>
                </form>
            </Box>
        </div>
        );
    }
}

function mapStateToProps({users, login}) {
    return {
        loading: users === null,
        users,
        isAuthed: login.authenticated
    }
}

export default connect(mapStateToProps)(Login);