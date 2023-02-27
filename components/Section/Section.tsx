import React, { FC, PropsWithChildren } from 'react';

type SectionTypes = {
  className?: string;
  backdrop?: React.ReactElement;
} & PropsWithChildren;

export const Section: FC<SectionTypes> = ({
  children,
  className,
  backdrop,
}) => {
  return (
    <section className="overflow-hidden relative">
      {backdrop}
      <div className={`bg-darkPurple/80 relative z-10 ${className}`}>
        {children}
      </div>
    </section>
  );
};
