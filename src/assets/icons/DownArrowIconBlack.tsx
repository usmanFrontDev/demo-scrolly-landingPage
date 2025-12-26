import * as React from "react";

interface DownArrowIconBlackProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const DownArrowIconBlack: React.FC<DownArrowIconBlackProps> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M11.0007 4.58331L11.0007 17.4166M11.0007 17.4166L17.4173 11M11.0007 17.4166L4.58398 11"
      stroke="white"
      stroke-width="1.83333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default DownArrowIconBlack;
