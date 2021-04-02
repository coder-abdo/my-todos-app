import React from "react";
type TProps = {
  children: React.ReactNode;
  socialClass: string;
};

export const SocialBtn = ({ socialClass, children }: TProps) => {
  return <button className={socialClass}>{children}</button>;
};
