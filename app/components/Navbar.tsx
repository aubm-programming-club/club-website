import { Link, useLocation } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/members", label: "Members" },
  { to: "/projects", label: "Projects" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-indigo-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold tracking-tight hover:text-indigo-200 transition-colors">
          UniCode Club
        </Link>
        <ul className="flex gap-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-sm font-medium transition-colors hover:text-indigo-200 ${
                  location.pathname === to
                    ? "border-b-2 border-indigo-300 pb-0.5"
                    : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
