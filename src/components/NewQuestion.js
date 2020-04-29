import React, { useState } from 'react';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions/shared';
import {Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

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

const NewQuestion = (props) => {
    const [optionOneText,setOptionOneText]= useState('')
    const [optionTwoText,setOptionTwoText]= useState('')
    const [toDashboard,setToDashboard]= useState(false)
    const [hasSubmitted,setHasSubmitted]= useState(false)
    const classes = useStyles();

    const handleOptionOneTextChange = (event) => {
        const text = event.target.value;
        setOptionOneText(text)
    };

    const handleOptionTwoTextChange = (event) => {
        const text = event.target.value;
        setOptionTwoText(text)
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const {dispatch} = props;
        setHasSubmitted(true)

        dispatch(handleAddQuestion(optionOneText, optionTwoText, () => {
        setOptionOneText('')
        setOptionTwoText('')
        setToDashboard(true)
        }));
    };
    if (toDashboard === true) {
        return <Redirect to='/'/>;
    }

    return (
        <Box display='flex' flexDirection='column' justifyContent='center'>
            <Box textAlign='center'>
                <h1>Create New Poll</h1>
            </Box>

            <div className={classes.root}>
                <Paper style={{ width: '50%', margin: 'auto', justifyContent: 'space-around', padding: '8px 8px' }}>
                    <p><strong>Would You Rather...?</strong></p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                placeholder='Enter option one text here...'
                                value={optionOneText}
                                onChange={handleOptionOneTextChange}
                            />
                        </div>
                        <Box my={1}>
                            <input
                                placeholder='Enter option two text here...'
                                value={optionTwoText}
                                onChange={handleOptionTwoTextChange}
                            />
                        </Box>
                        <Button type='submit' color='secondary' variant='contained'
                            onClick={handleSubmit}
                            disabled={
                                optionOneText === '' ||
                                optionTwoText === '' ||
                                hasSubmitted
                            }>{hasSubmitted ? "Submitting Question..." : "Submit"}</Button>
                    </form>
                </Paper>
            </div>
        </Box>                  
    );
};

export default connect()(NewQuestion);