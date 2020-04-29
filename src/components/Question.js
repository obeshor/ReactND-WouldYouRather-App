import React from 'react';
import {connect} from 'react-redux';
import {formatQuestion} from "../utils/helpers";
import {Link} from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    margin:theme.spacing(2,0),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const Question = (props) => {
    const classes = useStyles();
    const {question} = props;

    if (question === null) {
        return <p>This question doesn't exist.</p>
    }

    const {name, id, avatar, optionOne, optionTwo, hasVoted} = question;

    if (props.questionsToShow === 'answered' && hasVoted !== true) {
        return false;
    } else if (props.questionsToShow === 'unanswered' && hasVoted === true) {
        return false;
    }

    let viewPollLink = '';

    if (props.questionsToShow === 'answered') {
        viewPollLink = `/questions/${id}/results`;
    } else if (props.questionsToShow === 'unanswered') {
        viewPollLink = `/questions/${id}`;
    }

    return (
            <div className={classes.root}>
                <Paper style={{display:'flex',width:'70%',margin:'auto',justifyContent:'space-around',padding:'8px 8px'}}>
                    <Box width='40%' height='100%'>
                    <img style={{height:'inherit'}} src={avatar} alt={`Avatar of ${name}`} />
                    </Box>
                    <Box width='60%'>
                        <div >{name} asks would you rather...</div>
                        <p>{optionOne.text} <strong>OR</strong> {optionTwo.text}</p>
                        <Link to={viewPollLink}>
                            <Button variant='contained'>
                                View Poll
                            </Button>
                        </Link>
                    </Box>
                </Paper>
            </div>
    )
};


function mapStateToProps({login, users, questions}, {id, questionsToShow}) {
    const question = questions[id];

    return {
        authedUser: login.loggedInUser.id,
        question: formatQuestion(question, users[question.author], login.loggedInUser.id),
        questionsToShow
    }
}

export default connect(mapStateToProps)(Question);