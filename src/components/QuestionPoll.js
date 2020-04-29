import React, {useState} from 'react';
import {connect} from 'react-redux';
import {handleAddQuestionAnswer} from '../actions/shared';
import {Redirect} from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { Box, makeStyles, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      margin:theme.spacing(2,0),
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
const QuestionPoll = (props) => {
    const [optionSelected, setOptionSelected] = useState('')
    const [answerSubmitted, setAnswerSubmit] = useState(false)
    const classes = useStyles();
    const handleSubmit = (e, questionId)=> {
        e.preventDefault();

        const {dispatch} = props;

        dispatch(handleAddQuestionAnswer(questionId, optionSelected));
        setOptionSelected('')
        setAnswerSubmit(true)
    }

    const handleInputChange = (e) => {
        const text = e.target.value;
        setOptionSelected(text)
    };

    const {id, question, author, pageNotFound} = props;

    if (pageNotFound === true) {
        return <PageNotFound/>;
    }

    const redirectTo = `/questions/${id}/results`;

    if (answerSubmitted === true) {
        return <Redirect to={redirectTo}/>;
    }
    return (
        <Box>
            <div className={classes.root}>
                <Paper style={{ width: '50%', margin: 'auto', justifyContent: 'space-around', padding: '8px 8px' }}>
                    <p><strong>{author.name} asks would you rather...</strong></p>
                    <Box textAlign='center' height='170px'>
                        <img src={author.avatarURL} style={{height:'100%',borderRadius:'4%'}}
                            alt={`Avatar of ${author.name}`}
                            className='avatar' />
                    </Box>
                    <Box my={1}>
                        <form>
                            <div>
                                <input type="radio"
                                    name="questionPoll"
                                    id="optionOne"
                                    value="optionOne"
                                    onChange={handleInputChange}
                                />
                                <label
                                    htmlFor="optionOne">
                                    {question.optionOne.text}
                                </label>
                            </div>
                            <Box my={1}>
                                <input type="radio"
                                    name="questionPoll"
                                    id="optionTwo"
                                    value="optionTwo"
                                    onChange={handleInputChange}
                                />
                                <label
                                    htmlFor="exampleRadios2">
                                    {question.optionTwo.text}
                                </label>
                            </Box>
                            <Button variant='contained' color='secondary' onClick={(e) => handleSubmit(e, id)}
                                type='submit'
                                disabled={optionSelected === ''}
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Paper>
            </div>
        </Box>
                                
    );
};

function mapStateToProps({login, questions, users, match}, props) {
    const {id} = props.match.params;

    let pageNotFound = true;
    let author = "";
    let specificQuestion = "";

    if (questions[id] !== undefined) {
        pageNotFound = false;
        specificQuestion = questions[id];
        author = users[specificQuestion['author']];
    }

    return {
        id,
        question: specificQuestion,
        author: author,
        authedUser: login.loggedInUser.id,
        pageNotFound: pageNotFound
    }
}

export default connect(mapStateToProps)(QuestionPoll);