import React from "react"
import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div> 
      <main>
        <div className = 'header-section'>
              <div className = 'intro-section'>
                <p className = 'intro'>A new, interactive application to complement your online teaching and learning experience</p>
              </div>
              <div className="home-buttonsContainer">
                <div className="buttoncontainer1">
                  <button
                    onClick={() => navigate("/Register")}
                    className="getstarted"
                  ><p>
                  Get Started
                  </p>
                  </button>
                </div>
            </div>
          </div>
      </main>
    </div>
  )
}
export default Home