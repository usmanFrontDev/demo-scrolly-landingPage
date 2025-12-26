import DownArrowIcon from "../../assets/icons/DownArrowIcon"
import DownArrowIconBlack from "../../assets/icons/DownArrowIconBlack"
import { useTheme } from "../../context/ThemeContext"
import Button from "./Button"
import Carousel from "./Crousal"
import Typography from "./Typography"


const HeroSection = () => {

  const {theme} = useTheme()
  
  return (
    <div className="w-full min-h-screen gap-12 flex justify-start flex-col items-center pt-40">
     <div className="w-fit flex flex-col gap-6 justify-start items-center">
       <Typography variant="big" 
      className={`text-center leading-none sm:leading-20 
      bg-gradient-to-r ${theme === 'dark' ? 'from-[#FFFFFF] to-[#999999]' : 'from-[#000000] to-[#2D2D2D]'} bg-clip-text text-transparent`}>
        Discover Stories That  <br /> Scroll With You.
      </Typography>
       <Button 
         className="bounce-delayed"
       variant="primary" onClick={() => {
  window.scrollBy({
    top:350,
    behavior: "smooth"
  });
}}>
      Explore Scrollys {theme === 'dark' ?  <DownArrowIcon/> : <DownArrowIconBlack/>}
      </Button>
     </div>
       <Carousel/>
    </div>
  )
}

export default HeroSection