import React, { useState, useEffect } from 'react';

function Task() {
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [index, setIndex] = useState(0);
    const [totalscore, setTotalScore] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchquestions = async () => {
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=10");

            const fetchdata = await response.json();

            setQuestions(fetchdata.results.map((v) => ({
                questionData: v.question,
                options:
                    [v.correct_answer,
                    ...v.incorrect_answers],
                correct_answer: v.correct_answer,
            })));
            setLoading(false);
        } catch (error) {
            console.error('Error ', error);
        }
    };

    useEffect(() => {
        fetchquestions();
    }, []);

    const handleAnswer = (val) => {
        const newAnswer = [...answer];
        newAnswer[index] = val;
        setAnswer(newAnswer);
    };

    const NextQuestion = () => {
        if (index > questions.length - 1) {
            setIndex(index + 1);
            ScoreCounter();
        } else {
            ScoreCounter();
        }
    };

    const ScoreCounter = () => {
        let newScore = 0;

        questions.forEach((v, i) => {
            if (v.correct_answer === answer[i]) {
                newScore = newScore + 1;
            }
        });
        setTotalScore(newScore);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: 'center', margin: ' 0 auto', border: '2px solid #000', borderRadius: '20px', width: '500px', backgroundColor: '#add8e6' }}>
            <h1>KBC</h1>
            <b>{questions[index].questionData}</b>

            {
                questions[index].options.map((v, i) => (
                    <div >
                        <input
                            className='main'
                            type="radio"
                            name={`questions-${index}`}
                            value={v}
                            checked={answer[index] === v}
                            onChange={() => handleAnswer(v)}
                        />
                        <span>{v}</span>
                    </div>

                ))
            }
            <br></br>

            <button style={{ borderRadius: '20px' }} onClick={NextQuestion}>Next question..</button>
            <div>
                <p>Your Score :- {totalscore} <br></br>Total Score :-{questions.length}</p>

            </div>
        </div >

    );
};

export default Task;