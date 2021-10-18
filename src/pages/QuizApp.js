import React, {useState, useEffect} from 'react'
import '../scss/QuizApp.scss';

const quizData = [
    {
        question: 'How old is Martin?',
        a: '16',
        b: '15',
        c: '17',
        d: '18',
        correct: 'a'
    },
    {
        question: 'Where does martin live?',
        a: 'Hamar',
        b: 'Oslo',
        c: 'Elverum',
        d: 'Stange',
        correct: 'c'
    },
    {
        question: 'Whats martins favorite game?',
        a: 'Terraria',
        b: 'Minecraft',
        c: 'Cs:Go',
        d: 'R6',
        correct: 'd'
    },
]
const QuizApp = () => {
    const [ActiveCard, setActiveCard] = useState(0);
    const [AmountRight, setAmountRight] = useState(0);
    const [Answered, setAnswered] = useState(false)
    const [Correct, setCorrect] = useState(false)
    const [Finished, setFinished] = useState(false)

    function HandleAnswer(answer) {
        if(Answered) return;
        if(answer === quizData[ActiveCard].correct) {
            console.log("correct");
            var newVal = AmountRight + 1;
            setAmountRight(newVal);
            setCorrect(true);
        }else {
            console.log('false');
            setCorrect(false)
        }
        setAnswered(true);
        setTimeout(questionAnswered, 800);
    }

    function questionAnswered() {
        var newValue = ActiveCard + 1;
        console.log(newValue, quizData.length)
        if(newValue < (quizData.length)) {
            console.log("hey")
            setActiveCard(newValue);
            setAnswered(false);
        }else {
            setFinished(true);
        }
    }

    useEffect(() => {
        console.log(ActiveCard);
    }, [ActiveCard])

    return (
        <section className="quizgame">
            <div className="quiz-card">
                {Finished ? 
                <React.Fragment>
                    <h1>Finished!</h1>
                    <h3>Final Score</h3>
                    <h2>{AmountRight} / {quizData.length}</h2>

                </React.Fragment>    
                :
                    <React.Fragment>
                        <div className="quiz-box">
                            {!Answered ?
                            <React.Fragment>
                            <h2>{quizData[ActiveCard].question}</h2>
                            <div>
                                <button onClick={() => HandleAnswer('a')}>{quizData[ActiveCard].a}</button>
                                <button onClick={() => HandleAnswer('b')}>{quizData[ActiveCard].b}</button>
                                <button onClick={() => HandleAnswer('c')}>{quizData[ActiveCard].c}</button>
                                <button onClick={() => HandleAnswer('d')}>{quizData[ActiveCard].d}</button>
                            </div> 
                            </React.Fragment>
                            :
                            <div className="quiz-answer-icon">
                                {Correct ? <ion-icon style={{color: 'green'}} name="checkmark-outline" className="correct"></ion-icon> : <ion-icon style={{color: 'red'}} name="close-outline" className="false"></ion-icon> }
                            </div>
                            }
                        </div>
                        <h2>{AmountRight} / {quizData.length}</h2>
                    </React.Fragment>
                }
            </div>
        </section>
    )
}

export default QuizApp;