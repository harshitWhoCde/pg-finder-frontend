import React from 'react'
import { Navbar } from '../old_components/Navbar.jsx'
import HeroSection from '../old_components/HeroSection.jsx'
import PopularAreas from '../old_components/PopularAreas.jsx'
import WhyPlatform from '../old_components/WhyPlatform.jsx'
import StudentReviews from '../old_components/StudentReviews.jsx'
import Footer from '../old_components/Footer.jsx'

const HomePage = ({ onLoginClick,onRegisterClick }) => {
  return (
    <div>
      <Navbar onLoginClick={onLoginClick} onRegisterClick={onRegisterClick}/>
      <HeroSection/>
      <PopularAreas/>
      <WhyPlatform/>
      <StudentReviews/>
      <Footer/>
    </div>
  )
}

export default HomePage
