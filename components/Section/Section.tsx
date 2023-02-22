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
      <div
        className={`bg-darkPurple/80 relative backdrop-blur-xl z-10 ${className}`}
      >
        {children}
      </div>
      {backdrop}
    </section>
  );
};
