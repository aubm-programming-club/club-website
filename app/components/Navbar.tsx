import { Link, useLocation } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/members", label: "Members" },
  { to: "/projects", label: "Projects" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-black border-b border-red-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold tracking-tight text-red-500 hover:text-red-400 transition-colors">
          UniCode Club
        </Link>
        <ul className="flex gap-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-sm font-medium transition-colors hover:text-red-400 ${
                  location.pathname === to
                    ? "border-b-2 border-red-500 pb-0.5 text-red-400"
                    : "text-gray-300"
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
