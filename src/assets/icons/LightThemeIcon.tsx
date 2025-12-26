import * as React from "react";

interface LightThemeIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const LightThemeIcon: React.FC<LightThemeIconProps> = ({className}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="39"
    height="39"
    viewBox="0 0 39 39"
    fill="none"
    className={className}
  >
    <path
      d="M19.3913 3.23177V6.46354M19.3913 32.3177V35.5495M7.96697 7.96632L10.2454 10.2447M28.5372 28.5365L30.8156 30.8149M3.23242 19.3906H6.46419M32.3184 19.3906H35.5501M10.2454 28.5365L7.96697 30.8149M30.8156 7.96632L28.5372 10.2447M25.8548 19.3906C25.8548 22.9603 22.961 25.8542 19.3913 25.8542C15.8216 25.8542 12.9277 22.9603 12.9277 19.3906C12.9277 15.8209 15.8216 12.9271 19.3913 12.9271C22.961 12.9271 25.8548 15.8209 25.8548 19.3906Z"
      stroke="white"
      stroke-width="3.23177"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default LightThemeIcon;
