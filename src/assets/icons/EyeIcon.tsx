import * as React from "react";

interface EyeIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const EyeIcon: React.FC<EyeIconProps> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
  >
    <path
      d="M1.45421 8.70322C1.39547 8.54497 1.39547 8.3709 1.45421 8.21265C2.02633 6.82544 2.99746 5.63933 4.24449 4.80471C5.49152 3.97009 6.95829 3.52454 8.45885 3.52454C9.95941 3.52454 11.4262 3.97009 12.6732 4.80471C13.9202 5.63933 14.8914 6.82544 15.4635 8.21265C15.5222 8.3709 15.5222 8.54497 15.4635 8.70322C14.8914 10.0904 13.9202 11.2765 12.6732 12.1112C11.4262 12.9458 9.95941 13.3913 8.45885 13.3913C6.95829 13.3913 5.49152 12.9458 4.24449 12.1112C2.99746 11.2765 2.02633 10.0904 1.45421 8.70322Z"
      stroke="white"
      stroke-width="1.05725"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.45885 10.5724C9.62665 10.5724 10.5733 9.62574 10.5733 8.45793C10.5733 7.29013 9.62665 6.34343 8.45885 6.34343C7.29104 6.34343 6.34435 7.29013 6.34435 8.45793C6.34435 9.62574 7.29104 10.5724 8.45885 10.5724Z"
      stroke="white"
      stroke-width="1.05725"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default EyeIcon;
