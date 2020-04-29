import React from 'react';
import connect from "react-redux/es/connect/connect";
import { Box, Paper, makeStyles } from '@material-ui/core';

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
const Leaderboard = (props) => {
    const {users} = props;
    const classes = useStyles();

    let usersInfo = Object.keys(users).map((key, index) => {
        let questionsAnswered = Object.keys(users[key].answers).length;
        let questionsAsked = Object.keys(users[key].questions).length;

        return {
            'name': users[key].name,
            'avatar': users[key].avatarURL,
            'questionsAnswered': questionsAnswered,
            'questionsAsked': questionsAsked,
            'totalScore': questionsAnswered + questionsAsked
        }
    });

    usersInfo.sort((a, b) => {
        if (b.totalScore < a.totalScore) return -1;
        if (b.totalScore > a.totalScore) return 1;
        return 0;
    });

    return (
        <Box>
            {usersInfo.map((user, index) => (
                <div className={classes.root} key={index}>
                    <Paper style={{ width: '50%', margin: 'auto', justifyContent: 'space-around', padding: '8px 20px' }}>
                        <h1><strong>{user.name}</strong></h1>
                        <Box textAlign='center' height='170px'>
                            <img src={user.avatar} style={{height:'100%',borderRadius:'4%'}}
                                alt={`Avatar of ${user.name}`}
                            />
                        </Box>
                        <Box my={1}>
                            <div>
                                <p><strong><span>Answered Questions:</span></strong>
                                    <span>{user.questionsAnswered}</span>
                                </p>
                                <p><span><strong>Created Questions:</strong></span>
                                    <span>{user.questionsAsked}</span>
                                </p>
                            </div>
                            <div>
                                <h2><span>{user.totalScore}</span></h2>
                            </div>
                        </Box>
                    </Paper>
                </div>
            ))}
        </Box>
    )
};

function mapStateToProps({users}) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard);