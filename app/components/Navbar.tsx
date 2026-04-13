import { useState } from "react";
import { Link, useLocation } from "react-router";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/members", label: "Members" },
  { to: "/projects", label: "Projects" },
];

export function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#000000] text-white">
      <div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Brand */}
        <Link
          to="/"
          className="text-base font-medium tracking-tight text-white hover:text-[#8F8F8F] transition-colors"
        >
          UniCode Club
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-[13px] font-semibold tracking-[0.13px] transition-colors pb-1 ${
                  location.pathname === to
                    ? "text-white border-b-2 border-[#DA291C]"
                    : "text-[#8F8F8F] hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 text-white"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#000000] border-t border-[#303030] px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`text-[13px] font-semibold tracking-[0.13px] ${
                location.pathname === to
                  ? "text-white"
                  : "text-[#8F8F8F] hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
