import Image from "next/image";
import Github from "./Github";
import Twitter from "./Twitter";

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
    <div className="relative flex w-full items-center">
      <div className="flex w-full items-center justify-start">
        <Image
          src="/gradient.jpeg"
          alt="gradient logo"
          className="h-5 w-5 rounded-full"
          width={20}
          height={20}
        />
        <p className="hidden pl-2 text-xs md:flex ">an shco production</p>
        <p className="smMax:flex hidden pl-2 text-xs">shco</p>
      </div>

      <div className="flex w-full justify-center">
        <ul className="relative grid grid-cols-2 gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.url}>
              <a
                className="flex h-6 w-6 items-center justify-center"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{link.description}</span>
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden w-full sm:flex" />
    </div>
  );
};
