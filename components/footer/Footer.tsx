import Image from "next/image";
import Github from "./Github";
import Twitter from "./Twitter";

import gradient from "/public/gradient.jpeg"

export const Footer = () => {
  const links = [
    {
      url: "https://twitter.com/sickholdingco",
      description: "Shco Twitter",
      icon: <Twitter />,
    },
    {
      url: "https://github.com/sickholdingco",
      description: "Github",
      icon: <Github />,
    },
  ];

  return (
    <footer className="relative w-full flex items-center h-20 mt-10 pb-6 px-24">
      <div className="w-full flex justify-start items-center">
        <Image src={gradient} alt="gradient logo" className="h-5 w-5 rounded-full" />
        <p className="pl-2 text-xs hidden md:flex ">an shco production</p>
        <p className="pl-2 text-xs hidden smMax:flex">shco</p>
      </div>

      <div className="w-full flex justify-center">
        <ul className="relative grid grid-cols-2 gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.url}>
              <a
                className="flex items-center justify-center w-6 h-6"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer">
                <span className="sr-only">{link.description}</span>
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="w-full hidden sm:flex" />
    </footer>
  );
};