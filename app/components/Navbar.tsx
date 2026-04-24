import { Link, useLocation } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/members", label: "Members" },
  { to: "/projects", label: "Projects" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#111] flex items-center justify-between h-[58px] px-20">
      <Link to="/" className="flex items-center gap-2.5 no-underline group">
        <div className="w-7 h-7 bg-[#DA291C] rounded-[2px] flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-black leading-none">&lt;/&gt;</span>
        </div>
        <span className="text-white text-[13px] font-semibold tracking-[0.4px]">
          AUBM Programming Club
        </span>
      </Link>
      <ul className="flex gap-7 list-none m-0 p-0">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`text-[11px] font-medium tracking-[1.2px] uppercase no-underline transition-colors duration-200 ${
                location.pathname === to
                  ? "text-white border-b border-[#DA291C] pb-0.5"
                  : "text-[#444] hover:text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
