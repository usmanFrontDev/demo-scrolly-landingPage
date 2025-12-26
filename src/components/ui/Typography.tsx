import clsx from "clsx";
import type { JSX } from "react";

type TypographyVariant =
  | 'big'
  | 'normal'
  | 'para';

interface TypographyProps {
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}



const variantStyles: Record<TypographyVariant, string> = {
  para: 'text-xs sm:text-sm font-normal font-Urbanist text-[#FFFFFF80]',
  normal:
    'text-base sm:text-lg font-semibold font-Urbanist',
  big:
    'text-4xl sm:text-7xl font-normal font-Urbanist',
};

const Typography: React.FC<TypographyProps> = ({
  variant = 'normal',
  className,
  children,
}) => {
  const tagMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
    para: 'p',
    normal: 'p',
    big: 'h1',
  };

  const Tag = tagMap[variant] || 'p';

  return (
    <Tag className={clsx(variantStyles[variant], className)}>{children}</Tag>
  );
};

export default Typography;
