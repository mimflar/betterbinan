import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { governmentName, officialWebsite } from '../../lib/site';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/Binan_City_Seal.svg" alt="" width="40" height="40" />
              <span className="font-semibold text-lg">{governmentName}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-300">
              A community guide to local services. Prepare for your visit, find
              the right office, and understand your next step.
            </p>
            <p className="mt-3 text-xs text-gray-300">
              Service guides are currently available in English.
            </p>
          </div>
          <nav aria-label="Footer services">
            <h2 className="font-semibold mb-4">Find information</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/services">All services</Link>
              </li>
              <li>
                <Link to="/search">Search the guides</Link>
              </li>
              <li>
                <Link to="/government">Local government</Link>
              </li>
              <li>
                <a
                  href={officialWebsite}
                  className="inline-flex items-center gap-1"
                >
                  Official city website
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="About the portal">
            <h2 className="font-semibold mb-4">About the portal</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/about">About & contact</Link>
              </li>
              <li>
                <Link to="/accessibility">Accessibility</Link>
              </li>
              <li>
                <Link to="/sitemap">Sitemap</Link>
              </li>
              <li>
                <a href="https://bettergov.ph/join-us">
                  Contribute to BetterGov ↗
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-white/15 mt-8 pt-6 flex flex-col gap-3 sm:flex-row sm:justify-between text-xs text-gray-300">
          <p>Built for the community. Powered by BetterGov.</p>
          <a href={officialWebsite}>
            Confirm current service details with the responsible city office ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
