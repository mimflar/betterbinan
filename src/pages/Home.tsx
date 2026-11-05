import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Find City of Biñan service guides, requirements, and local government information."
        keywords="government, local government, services, public services, civic services"
      />
      <div>
        <Hero />
        <ServicesSection />
        <GovernmentActivitySection />
      </div>
    </>
  );
};

export default Home;
