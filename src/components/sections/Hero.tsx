import {
  ArrowRight,
  Building2,
  GraduationCap,
  Heart,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceSearch from '../ui/ServiceSearch';
import { governmentName } from '../../lib/site';
const shortcuts = [
  { label: 'Business permits', href: '/services/business', icon: Building2 },
  {
    label: 'Scholarships',
    href: '/services/education/apply-for-local-scholarships',
    icon: GraduationCap,
  },
  { label: 'Health services', href: '/services/health-services', icon: Heart },
  {
    label: 'Financial & family assistance',
    href: '/services/social-welfare',
    icon: Users,
  },
];
export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 items-center">
        <div>
          <p className="eyebrow text-primary-200">
            Your community. Your services.
          </p>
          <h1 className="hero-title">
            A simpler way to find {governmentName} services.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-100 leading-relaxed">
            Find requirements, understand the steps, and know where to go. Local
            information, all in one place.
          </p>
          <div className="mt-7">
            <ServiceSearch />
          </div>
          <p className="mt-3 text-sm text-primary-100">
            Search our service guides and department information.
          </p>
        </div>
        <div className="quick-links">
          <p className="eyebrow text-primary-200 mb-2">
            What do you need help with?
          </p>
          {shortcuts.map(({ label, href, icon: Icon }) => (
            <Link key={href} to={href} className="quick-link">
              <Icon className="h-5 w-5 text-primary-200" aria-hidden="true" />
              <span className="flex-1">{label}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
