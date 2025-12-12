
import { Navbar } from './old_components/Navbar.jsx'
import HeroSection from './old_components/HeroSection.jsx'
import PopularAreas from './old_components/PopularAreas.jsx'
import StudentReviews from './old_components/StudentReviews.jsx'
import WhyPlatform from './old_components/WhyPlatform.jsx'
import Footer from './old_components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'

const App = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <PopularAreas/>
      <StudentReviews/>
      <WhyPlatform/>
      <Footer/> 
      
      {/*<HomePage/>*/}
    </div>
  )
}

export default App
