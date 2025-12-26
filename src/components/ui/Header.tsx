import { Moon, Sun } from "lucide-react";
import logo from "../../assets/svgs/logo.svg";
import blackLogo from "../../assets/svgs/blackLogo.svg";
import mobileDarkLogo from "../../assets/svgs/mobileLogoDark.svg";
import mobileWhiteLogo from "../../assets/svgs/mobileLogoWhite.svg";

import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const desktopLogo = theme === "dark" ? logo : blackLogo;
  const mobileLogo = theme === "dark" ? mobileDarkLogo : mobileWhiteLogo;

  return (
    <div
      className="flex justify-between items-center px-4 sm:px-7 py-2 sm:py-3
    fixed top-0 left-0 right-0 z-[9999] border-b border-[#6C6C6C] backdrop-blur-lg"
    >
      <>
        <img src={desktopLogo} alt="logo" className="w-44 max-sm:hidden" />
        <img src={mobileLogo} alt="logo" className="w-40 sm:hidden" />
      </>

      {/* Desktop */}
      <button
        onClick={toggleTheme}
        className="hidden sm:block hover:scale-110 transition-transform cursor-pointer"
      >
        {theme === "dark" ? (
          <Sun size={24} className="text-white" />
        ) : (
          <Moon size={24} className="text-black" />
        )}
      </button>

      {/* Mobile */}
      <button
        onClick={toggleTheme}
        className="sm:hidden hover:scale-110 transition-transform"
      >
        {theme === "dark" ? (
          <Sun size={20} className="text-white" />
        ) : (
          <Moon size={20} className="text-black" />
        )}
      </button>
    </div>
  );
};

export default Header;
