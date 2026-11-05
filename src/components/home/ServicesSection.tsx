import Section from '../ui/Section';
import CategoryGrid from '../ui/CategoryGrid';
import { serviceCategories } from '../../data/yamlLoader';
export default function ServicesSection({
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
    <Section id="services">
      <p className="eyebrow text-primary-800">Explore local services</p>
      <Title className="section-title">{title || 'How can we help you?'}</Title>
      <p className="section-description">
        {description ||
          'Start with a category to find the requirements and next steps for your visit.'}
      </p>
      <CategoryGrid
        categories={serviceCategories.categories}
        section="services"
      />
    </Section>
  );
}
