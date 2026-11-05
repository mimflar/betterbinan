import Section from '../ui/Section';
import CategoryGrid from '../ui/CategoryGrid';
import { governmentCategories, isNestedCategory } from '../../data/yamlLoader';
export default function GovernmentActivitySection({
  title,
  description,
  asPage = false,
}: {
  title?: string;
  description?: string;
  asPage?: boolean;
}) {
  const Title = asPage ? 'h1' : 'h2';
  return (
    <Section id="government" className="government-section">
      <p className="eyebrow text-primary-800">Know your city</p>
      <Title className="section-title">
        {title || 'Your local government'}
      </Title>
      <p className="section-description">
        {description ||
          'Explore the people and departments serving the City of Biñan.'}
      </p>
      <CategoryGrid
        categories={governmentCategories.categories.filter(category =>
          isNestedCategory(category.slug)
        )}
        section="government"
      />
      <p className="mt-6 text-sm text-gray-600">
        Looking for city announcements?{' '}
        <a
          className="text-link"
          href="https://www.binan.gov.ph/"
          target="_blank"
          rel="noreferrer"
        >
          Visit the official city website{' '}
          <span className="sr-only">(opens in a new tab)</span>↗
        </a>
      </p>
    </Section>
  );
}
