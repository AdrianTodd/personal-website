import Link from "next/link";

interface NavLinkProps {
  href: string;
  title: string;
}

const NavLink = (props: NavLinkProps) => {
  return (
    <Link
      href={props.href}
      className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl md:p-0 hover:text-white'
    >
      {props.title}
    </Link>
  );
};

export default NavLink;
