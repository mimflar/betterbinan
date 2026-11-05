import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Category } from '../../data/yamlLoader';
import CategoryIcon from './CategoryIcon';
export default function CategoryGrid({
  categories,
  section,
}: {
  categories: Category[];
  section: 'services' | 'government';
}) {
  return (
    <div className="category-grid">
      {categories.map(category => (
        <Link
          key={category.slug}
          to={`/${section}/${category.slug}`}
          className="category-card group"
        >
          <span className="category-icon">
            <CategoryIcon name={category.icon} />
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-800">
              {category.category}
            </h3>
            <p className="category-description">{category.description}</p>
          </div>
          <ChevronRight
            className="h-5 w-5 shrink-0 text-primary-700"
            aria-hidden="true"
          />
        </Link>
      ))}
    </div>
  );
}
