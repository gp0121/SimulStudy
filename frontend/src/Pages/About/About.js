import react from 'react'
import './About.css'

const About = () => {
    return (
        <div>
            <main>
                <div className = 'header-section'>
                    <p>SimulStudy is developed with both students and teachers in mind to better accomodate for online learning environemts.</p>
                </div>
                <div className = 'howto-section'>
                    <div className = 'howto'>
                        <h3 style = {{color: "white"}}>For Teachers:</h3>
                        <p style = {{color: "white", fontSize: "20px", paddingTop: "30px"}}>To get started, create an account as a teacher. You will then be able to create quizzes and invite your students. After the quiz is finished, you will be able to view your students' scores and attendances.</p>
                    </div>
                    <div className = 'howto'>
                        <h3 style = {{color: "white"}}>For Students:</h3>
                        <p style = {{color: "white", fontSize: "20px", paddingTop: "30px"}}> First, create an account as a student. Once you are logged in, it will allow you to input a PIN code given by your teacher to take your quiz. Your scores and atendance will be tracked automatically, so there won't be any further complications.</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default About