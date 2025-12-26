import * as React from "react";

interface GrowthIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const GrowthIcon: React.FC<GrowthIconProps> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
<path d="M2.11328 2.11438V13.3917C2.11328 13.7656 2.2618 14.1241 2.52616 14.3885C2.79053 14.6529 3.14908 14.8014 3.52295 14.8014H14.8003M13.3906 6.34338L9.86645 9.86755L7.04711 7.04821L4.93261 9.16271" stroke="white" stroke-width="1.05725" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

export default GrowthIcon;
