import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search as SearchIcon } from 'lucide-react';
import Section from '../components/ui/Section';
import ServiceSearch from '../components/ui/ServiceSearch';
import SEO from '../components/SEO';
import { getSearchEntries } from '../data/yamlLoader';
const entries = getSearchEntries();
const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
export default function Search() {
  const [params] = useSearchParams();
  const query = params.get('q')?.trim() || '';
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const results = query
    ? entries.filter(entry =>
        terms.every(term =>
          normalize(
            `${entry.title} ${entry.description} ${entry.category}`
          ).includes(term)
        )
      )
    : [];
  return (
    <>
      <SEO
        title="Search services"
        description="Find service requirements, guides, and local department information."
      />
      <Section>
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-primary-800">Find your next step</p>
          <h1 className="section-title">Search services & information</h1>
          <p className="section-description">
            Search by a service, topic, or requirement.
          </p>
          <ServiceSearch key={query} query={query} />
          {query ? (
            <>
              <p role="status" className="my-6 text-gray-600">
                {results.length} {results.length === 1 ? 'result' : 'results'}{' '}
                for <strong className="text-gray-900">“{query}”</strong>
              </p>
              {results.length ? (
                <ul className="divide-y divide-gray-200">
                  {results.map(entry => (
                    <li key={entry.href}>
                      <Link className="search-result group" to={entry.href}>
                        <div>
                          <span className="text-xs font-semibold text-primary-800">
                            {entry.category}
                          </span>
                          <h2 className="text-lg font-semibold mt-1 text-gray-900 group-hover:text-primary-800">
                            {entry.title}
                          </h2>
                          <p className="mt-2 text-gray-600 leading-relaxed">
                            {entry.description}
                          </p>
                        </div>
                        <ArrowRight
                          className="h-5 w-5 shrink-0 text-primary-700"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="empty-state">
                  <SearchIcon
                    className="mx-auto mb-4 h-8 w-8 text-primary-700"
                    aria-hidden="true"
                  />
                  <h2 className="text-xl font-semibold">
                    No matching guides yet
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Try fewer words, check your spelling, or browse the service
                    categories.
                  </p>
                  <Link to="/services" className="text-link mt-5 inline-block">
                    Browse all services →
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="mt-8">
              <h2 className="font-semibold text-gray-900">Popular searches</h2>
              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  'scholarships',
                  'business permits',
                  'vaccines',
                  'assistance',
                  'garbage',
                ].map(term => (
                  <Link
                    className="search-chip"
                    key={term}
                    to={`/search?q=${encodeURIComponent(term)}`}
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
