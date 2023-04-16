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
    <div className="relative flex w-full items-center max-md:w-auto max-md:flex-none">
      <div className="flex w-full flex-col items-start justify-center">
        <ul className="relative flex gap-4">
          <li>
            <a
              target="_parent"
              rel="noopener noreferrer"
              href="https://shco.io"
            >
              <Image
                src="/gradient.jpeg"
                alt="gradient logo"
                className="h-6 w-6 rounded-full"
                width={20}
                height={20}
              />
            </a>
          </li>
          {links.map((link) => (
            <li key={link.url} className="max-md:hidden max-md:flex-none">
              <a
                className="flex h-6 w-6 items-center justify-center "
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
        <p className="block pt-1 text-xs max-md:hidden">an shco production</p>
      </div>
    </div>
  );
};
