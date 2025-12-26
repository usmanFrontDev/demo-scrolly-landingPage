import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "../../context/ThemeContext";
import { useRecentScrollys } from "../../hooks/useLandingScrolly";

const CustomCarousel = () => {

  const {theme} = useTheme()

const { data, isLoading, isError } = useRecentScrollys();

  // State for just image URLs
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (data?.items) {
      const imgs = data.items.map(item => item.thumbnail);
      setImages(imgs);
    }
  }, [data?.items]);
  const totalCards = images.length;

  console.log(data)
  
  // Calculate how many cards to show based on total cards
  const getMaxVisibleCards = () => {
    if (totalCards === 1) return 1;
    if (totalCards === 2) return 2;
    if (totalCards <= 7) {
      // For odd numbers, show all cards
      // For even numbers, show totalCards - 1 to maintain center
      return totalCards % 2 === 0 ? totalCards - 1 : totalCards;
    }
    return 7; // Default max for 7+ cards
  };

  const maxVisibleCards = getMaxVisibleCards();
  const sideCards = Math.floor(maxVisibleCards / 2); // Cards on each side of center
  
  // Set initial index to center
  const [currentIndex, setCurrentIndex] = useState(Math.floor(totalCards / 2));

  const getVisibleImages = () => {
    const visible = [];
    
    // For 1 card, only show that card
    if (totalCards === 1) {
      visible.push({
        src: images[0],
        position: 0,
        index: 0,
      });
      return visible;
    }
    
    // For 2 cards, show both with special positioning
    if (totalCards === 2) {
      visible.push({
        src: images[currentIndex],
        position: 0,
        index: currentIndex,
      });
      const otherIndex = currentIndex === 0 ? 1 : 0;
      visible.push({
        src: images[otherIndex],
        position: currentIndex === 0 ? 1 : -1,
        index: otherIndex,
      });
      return visible;
    }
    
    // For 3+ cards with loop effect
    for (let i = -sideCards; i <= sideCards; i++) {
      const index = (currentIndex + i + totalCards) % totalCards;
      visible.push({
        src: images[index],
        position: i,
        index: index,
      });
    }
    return visible;
  };

  const handleNext = () => {
    if (totalCards === 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    if (totalCards === 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const getImageStyles = (position: number) => {
    const absPos = Math.abs(position);

    if (position === 0) {
      return {
        scale: 1,
        x: 0,
        zIndex: 50,
        opacity: 1,
        filter: "brightness(1)",
        rotateY: 0,
      };
    }

    // Gradually decrease scale
    const scale = Math.max(0.65, 1 - absPos * 0.12);

    // Overlap effect - closer spacing
    const baseOffset = 170;
    const offset = position * baseOffset;

    // Gradually decrease opacity
    const opacity = Math.max(0.4, 1 - absPos * 0.18);

    // Gradually decrease brightness
    const brightness = Math.max(0.6, 1 - absPos * 0.12);

    // Slight rotation for depth
    const rotateY = position * -8;

    return {
      scale,
      x: offset,
      zIndex: 50 - absPos,
      // opacity,
      // filter: `brightness(${brightness})`,
      rotateY,
    };
  };

  return (
    <div className="relative w-full h-[90dvh] flex items-center justify-center overflow-hidden">
      {/* Carousel container */}
      <div className="relative w-full h-96 flex items-center justify-center">
        {/* Images */}
        <div className="relative w-full h-full flex items-center justify-center">
          {getVisibleImages().map((item, idx) => (
            <motion.div
              key={`${item.index}-${idx}`}
              className="absolute cursor-pointer"
              // initial={false}
              animate={getImageStyles(item.position)}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
              }}
              style={{
                width: "280px",
                height: "496px",
                perspective: "1000px",
                objectFit: "cover",
              }}
              onClick={() => {
                if (item.position !== 0 && totalCards > 2) {
                  const steps = item.position;
                  if (steps > 0) {
                    for (let i = 0; i < steps; i++) {
                      setTimeout(() => handleNext(), i * 100);
                    }
                  } else {
                    for (let i = 0; i < Math.abs(steps); i++) {
                      setTimeout(() => handlePrev(), i * 100);
                    }
                  }
                }
              }}
            >
              <motion.img
                src={item.src}
                alt={`Slide ${item.index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Reflection effect */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Navigation buttons - Hide for single card */}
        {totalCards > 1 && (
          <>
            <button
              onClick={handlePrev}
              className={`absolute cursor-pointer left-8 z-[100]
               backdrop-blur-md p-4 rounded-full transition-all duration-300 hover:scale-110 
                shadow-xl border border-white/20
                ${ theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  :'bg-black/30 hover:bg-black/40 text-white border-black/20'
                }`}
            >
              <ChevronLeft size={44} />
            </button>

            <button
              onClick={handleNext}
              className={`absolute cursor-pointer right-8 z-[100]
                  backdrop-blur-md p-4 rounded-full transition-all 
                  duration-300 hover:scale-110 shadow-xl border
            ${ theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  :'bg-black/30 hover:bg-black/40 text-white border-none'
                }`}
            >
              <ChevronRight size={44} />
            </button>
          </>
        )}

        <div  className={clsx(
    "w-full h-48 bg-gradient-to-t to-transparent absolute -bottom-[15%] left-0 z-[999] pointer-events-none",
    theme === 'dark' ? "from-[#141414]" : "from-[#ffffff]"
  )}></div>
      </div>

      {/* Indicators - Hide for single card */}
      {totalCards > 1 && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-[999]">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
             className={`transition-all cursor-pointer duration-300 rounded-full ${
              idx === currentIndex
                ? `w-8 h-2 ${theme === 'dark' ? 'bg-white' :'bg-black'}`
                : `w-2 h-2 ${theme === 'dark' ? 'bg-white/20 hover:bg-white/60' :'bg-[#B8B7B7] hover:bg-black'}
                 `
            }`}
            />
          ))}
        </div>
      )}

      {/* Title overlay on center image */}
      <motion.div
        className="absolute bottom-32 z-[60] text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      </motion.div>
    </div>
  );
};

export default CustomCarousel;