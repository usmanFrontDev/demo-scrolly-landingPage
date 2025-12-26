import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header"
import HeroSection from "../components/ui/HeroSection"
import Demo from "../components/ui/TableWrapper";
import { useTheme } from "../context/ThemeContext";

const LandingPage = () => {

  const { theme } = useTheme();


  return (
    <div 
    className={`w-full overflow-x-hidden min-h-screen ${theme === 'dark' ? 'bg-background': 'bg-white'}
    transition-all ease-in duration-150`}>
     <Header/>
     <HeroSection />
     <Demo/>
     <Footer/>
    </div>
  )
}

export default LandingPage