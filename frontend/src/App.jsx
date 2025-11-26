import React from 'react'
import { Navbar } from '../public/components/Navbar.jsx'
import HeroSection from '../public/components/HeroSection.jsx'
import PopularAreas from '../public/components/PopularAreas.jsx'
import StudentReviews from '../public/components/StudentReviews.jsx'
import WhyPlatform from '../public/components/WhyPlatform.jsx'
import Footer from '../public/components/Footer.jsx'

const App = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <PopularAreas/>
      <StudentReviews/>
      <WhyPlatform/>
      <Footer/>
    </div>
  )
}

export default App
