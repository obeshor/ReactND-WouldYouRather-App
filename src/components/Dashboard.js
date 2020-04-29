import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from './Question';
import { Box, Button } from '@material-ui/core';

class Dashboard extends Component {

    state = {
        'questionsToShow': 'unanswered',
        'activeTab': 'unanswered'
    };

    handleTabChange = (e, tab) => {
        this.setState(() => ({
            questionsToShow: tab,
            activeTab: tab
        }));
    };

    render() {
        const {questionsToShow, activeTab} = this.state;

        return (
         <Box mt={2}>
            <Box display='flex' justifyContent='center'>
                <Button variant={activeTab === 'unanswered' ? 'contained' : null} color='secondary'
                    onClick={(e) => this.handleTabChange(e, 'unanswered')}>Unanswered
                    Questions
                </Button>
                <Button variant={activeTab === 'answered' ? 'contained' : null} color='secondary'
                    onClick={(e) => this.handleTabChange(e, 'answered')}>Answered
                    Questions
                </Button>
            </Box>
            <Box mt={5}>
                    {this.props.questionIds.map((id,index) => {
                        return (
                            <Question key={id} id={id}
                                questionsToShow={questionsToShow}/>
                        )
                    })}
            </Box>
        </Box>   
                    
        )
    }
}

function mapStateToProps({questions}) {
    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);