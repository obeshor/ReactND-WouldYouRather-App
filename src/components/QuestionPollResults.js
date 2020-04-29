import React from 'react';
import {connect} from 'react-redux';
import PageNotFound from './PageNotFound';
import { Box, makeStyles, Paper } from '@material-ui/core';

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
const QuestionPollResults = (props) => {
    const {question, author, pageNotFound} = props;
    const classes = useStyles();

    if (pageNotFound === true) {
        return <PageNotFound/>;
    }

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

    const optionSelected = question.optionOne.votes.includes(author.id) ? "optionOne" : "optionTwo";

    let optionOneWidth = Math.round((question.optionOne.votes.length / totalVotes) * 100);
    let optionTwoWidth = Math.round((question.optionTwo.votes.length / totalVotes) * 100);

    return (
        <Box>
            <div className={classes.root}>
                <Paper style={{ width: '50%', margin: 'auto', justifyContent: 'space-around', padding: '8px 8px' }}>
                    <p><strong>Added by {author.name}</strong></p>
                    <Box textAlign='center' height='170px'>
                        <img src={author.avatarURL} style={{height:'100%',borderRadius:'4%'}}
                            alt={`Avatar of ${author.name}`}
                            className='avatar' />
                    </Box>
                    <Box my={1}>
                        <div>Results:</div>
                        <div className={`card card-poll-results ${(optionSelected === 'optionOne') ? "chosen-answer" : ""}`}>Would you rather {question.optionOne.text}?

                            <div className="progress m-progress--sm">
                                <div className="progress-bar m--bg-success"
                                    style={{ width: optionOneWidth + '%' }}
                                ></div>
                            </div>
                            <div>
                                <span>{question.optionOne.votes.length} out of {totalVotes} votes. ({optionOneWidth}%)</span>
                            </div>

                        </div>
                        <div className={`card card-poll-results ${(optionSelected === 'optionTwo') ? "chosen-answer" : ""}`}>Would you rather {question.optionTwo.text}?

                            <div className="progress m-progress--sm">
                                <div className="progress-bar m--bg-success"
                                    style={{ width: optionTwoWidth + '%' }}
                                ></div>
                            </div>
                            <div>
                                <span>{question.optionTwo.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</span>
                            </div>
                        </div>
                    </Box>
                </Paper>
            </div>
        </Box>
    )
};

function mapStateToProps({authedUser, questions, users}, props) {
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
        pageNotFound: pageNotFound
    }
}

export default connect(mapStateToProps)(QuestionPollResults);