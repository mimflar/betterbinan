import { Link, useLocation } from 'react-router-dom';
import Section from '../components/ui/Section';
import SEO from '../components/SEO';
import { governmentName, officialWebsite } from '../lib/site';
import { serviceCategories } from '../data/yamlLoader';
export default function Information() {
  const { pathname } = useLocation();
  const title =
    pathname === '/about'
      ? 'About this portal'
      : pathname === '/accessibility'
        ? 'Accessibility'
        : pathname === '/sitemap'
          ? 'Sitemap'
          : 'Page not found';
  return (
    <>
      <SEO title={title} />
      <Section>
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-primary-800">{governmentName}</p>
          <h1 className="section-title">{title}</h1>
          {pathname === '/about' ? (
            <div className="information-copy">
              <p>
                This community portal helps residents find local service guides
                and information about {governmentName}. It is built on the
                open-source BetterGov local government starter kit.
              </p>
              <h2>Before you apply or visit</h2>
              <p>
                Use these guides to prepare your questions and documents.
                Requirements, fees, schedules, and availability may change.
                Confirm the current details with the responsible city office
                before making a trip or payment.
              </p>
              <h2>Contact the city</h2>
              <p>
                For applications, appointments, official announcements, and city
                contact information, use the{' '}
                <a href={officialWebsite} className="text-link">
                  official City of Biñan website ↗
                </a>
                .
              </p>
              <h2>Help improve the guides</h2>
              <p>
                Found something missing or outdated?{' '}
                <a href="https://bettergov.ph/join-us" className="text-link">
                  Learn about contributing to BetterGov ↗
                </a>
                .
              </p>
            </div>
          ) : pathname === '/accessibility' ? (
            <div className="information-copy">
              <p>
                This portal aims to make local information easier to find and
                use. You can navigate links and controls with the keyboard, use
                the skip link to reach the page content, and enlarge text using
                your browser’s zoom controls.
              </p>
              <h2>Keyboard navigation</h2>
              <p>
                Press Tab to move forward and Shift + Tab to move back. Press
                Enter to follow a link. On small screens, use the menu button to
                reveal navigation; Escape closes the menu and returns focus to
                the button.
              </p>
              <h2>Reading service guides</h2>
              <p>
                Long guides include links to their sections. Requirement
                checkboxes reflect the published guide; they do not track an
                application or submit any information.
              </p>
              <h2>Language and help</h2>
              <p>
                The service guides are currently available in English. For
                assistance with a city service or an alternative way to access
                the information, contact the relevant office through the{' '}
                <a href={officialWebsite} className="text-link">
                  official city website ↗
                </a>
                .
              </p>
            </div>
          ) : pathname === '/sitemap' ? (
            <div className="information-copy">
              <h2>Explore the portal</h2>
              <ul>
                {[
                  { title: 'Home', href: '/' },
                  { title: 'Search services', href: '/search' },
                  { title: 'All services', href: '/services' },
                  { title: 'Local government', href: '/government' },
                  { title: 'About this portal', href: '/about' },
                  { title: 'Accessibility', href: '/accessibility' },
                ].map(item => (
                  <li key={item.href}>
                    <Link className="text-link" to={item.href}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <h2>Service categories</h2>
              <ul>
                {serviceCategories.categories.map(category => (
                  <li key={category.slug}>
                    <Link
                      className="text-link"
                      to={`/services/${category.slug}`}
                    >
                      {category.category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="information-copy">
              <p>The page may have moved, or the address may be incorrect.</p>
              <Link to="/search" className="primary-button inline-flex">
                Find a service
              </Link>
              <Link to="/" className="text-link block mt-5">
                Return to the homepage
              </Link>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
