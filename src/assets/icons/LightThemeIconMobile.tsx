import * as React from "react";

interface LightThemeIconMobileProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const LightThemeIconMobile: React.FC<LightThemeIconMobileProps> = ({
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    className={className}
  >
    <path
      d="M15.0008 2.50016V5.00032M15.0008 25.0016V27.5018M6.16274 6.1629L7.92535 7.92551M22.0763 22.0764L23.8389 23.839M2.5 15.001H5.00016M25.0015 15.001H27.5016M7.92535 22.0764L6.16274 23.839M23.8389 6.1629L22.0763 7.92551M20.0011 15.001C20.0011 17.7626 17.7624 20.0013 15.0008 20.0013C12.2392 20.0013 10.0005 17.7626 10.0005 15.001C10.0005 12.2394 12.2392 10.0006 15.0008 10.0006C17.7624 10.0006 20.0011 12.2394 20.0011 15.001Z"
      stroke="white"
      stroke-width="2.50016"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default LightThemeIconMobile;
