import { useTheme } from "../../context/ThemeContext"



const Footer = () => {

  const {theme} = useTheme()
  return (
   <div className="w-full px-10 mt-10">
     <div className={`w-full py-4 border border-transparent
      ${theme === 'dark' ? 'border-t-[#5A5A5A]' : 'border-t-[#0000004D]'}`}>
        <p className={`font-Urbanist text-xs text-light sm:text-sm text-center
          ${theme === 'dark' ? 'text-white' : 'text-black'}
          `}>
          All right reserved © 2025</p></div>
   </div>
  )
}


export default Footer