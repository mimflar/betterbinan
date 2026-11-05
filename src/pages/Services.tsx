import { governmentName } from '../lib/site';
import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  serviceCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import CategoryIcon from '../components/ui/CategoryIcon';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

const Services: React.FC = () => {
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return serviceCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  useEffect(() => {
    let active = true;
    if (category && categoryData) {
      setLoading(true);
      setCategoryIndex({ layout: 'list', pages: [] });
      getCategorySubcategories(category)
        .then(index => {
          if (active) setCategoryIndex(index);
        })
        .catch(console.error)
        .finally(() => {
          if (active) setLoading(false);
        });
    }
    return () => {
      active = false;
    };
  }, [category, categoryData]);

  if (!category) {
    return (
      <>
        <SEO
          title="Services"
          description={`Browse service guides for ${governmentName}. Find requirements and next steps for business, health, education, and more.`}
          keywords="government services, public services, local government, civic services"
        />
        <ServicesSection
          asPage
          title={`All local government services`}
          description={`Browse service guides for ${governmentName}. Find requirements and next steps for business, health, education, and more.`}
        />
      </>
    );
  }
  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Category not found"
          description="The category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={categoryData.category || category}
        description={categoryData.description}
        keywords={`${categoryData.category}, government services, public services, local government`}
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <CategoryIcon
          name={categoryData.icon}
          className="h-8 w-8 mb-4 text-primary-700"
        />
        <Heading>{categoryData.category || category}</Heading>
        <Text className="text-gray-600 mb-6">{categoryData.description}</Text>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Text>Loading services...</Text>
          </div>
        ) : subcategories.length === 0 ? (
          <div className="empty-state">
            <h2 className="text-xl font-semibold">
              No guides published here yet
            </h2>
            <p className="mt-2 text-gray-600">
              Explore another category or visit the official city website for
              current information.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-5">
              <Link className="text-link" to="/services">
                Browse services
              </Link>
              <a className="text-link" href="https://www.binan.gov.ph/">
                Official city website ↗
              </a>
            </div>
          </div>
        ) : (
          <>
            {categoryIndex.title && (
              <Heading level={3}>{categoryIndex.title}</Heading>
            )}
            {categoryIndex.description && (
              <Text className="text-gray-600 mb-4">
                {categoryIndex.description}
              </Text>
            )}
            {categoryIndex.layout === 'grid' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/services/${category}/${subcategory.slug}`}
                  >
                    <Card
                      hoverable
                      className="h-full border-t-4 border-primary-500"
                    >
                      <CardContent>
                        <h2 className="text-lg font-medium text-gray-900">
                          {subcategory.name}
                        </h2>
                        {subcategory.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {subcategory.description}
                          </p>
                        )}
                        <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                          {categoryData.category || category}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/services/${category}/${subcategory.slug}`}
                  >
                    <Card hoverable className="mb-4">
                      <CardContent>
                        <h2 className="text-lg font-medium text-gray-900">
                          {subcategory.name}
                        </h2>
                        {subcategory.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {subcategory.description}
                          </p>
                        )}
                        <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                          {categoryData.category || category}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
};

export default Services;
