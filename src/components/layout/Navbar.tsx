import { useRef, useState } from 'react';
import { Menu, X, Search, ArrowUpRight } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { governmentName, officialWebsite } from '../../lib/site';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const links = [
    { label: 'Services', href: '/services' },
    { label: 'Government', href: '/government' },
    { label: 'About this portal', href: '/about' },
  ];
  return (
    <header
      className="site-header"
      onKeyDown={event => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="utility-bar">
        <div className="container mx-auto px-4 flex items-center justify-between gap-3">
          <span>A community guide to {governmentName}</span>
          <a
            href={officialWebsite}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1"
          >
            Official city website{' '}
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 py-4">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 min-w-0"
          aria-label={`${governmentName} portal home`}
        >
          <img
            src="/Binan_City_Seal.svg"
            alt=""
            width="44"
            height="44"
            className="shrink-0"
          />
          <span>
            <span className="block font-bold text-lg text-gray-900">
              {governmentName}
            </span>
            <span className="block text-xs text-gray-600">
              Services & community information
            </span>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-7"
        >
          {links.map(link => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/search" className="search-nav">
            <Search className="h-4 w-4" aria-hidden="true" />
            Search
          </NavLink>
        </nav>
        <button
          ref={button}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close main menu' : 'Open main menu'}
          className="md:hidden p-3 rounded-lg text-gray-800 border border-gray-200"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        className="md:hidden border-t border-gray-200 px-4 py-3 bg-white"
      >
        {[...links, { label: 'Search services', href: '/search' }].map(link => (
          <NavLink
            key={link.href}
            to={link.href}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 font-medium ${isActive ? 'bg-primary-50 text-primary-900' : 'text-gray-800'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
