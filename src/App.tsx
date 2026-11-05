import { lazy, Suspense } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ui/ScrollToTop';
import Services from './pages/Services';
import Government from './pages/Government';
import Search from './pages/Search';
import Information from './pages/Information';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Document = lazy(() => import('./pages/Document'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <ScrollToTop />
            <main id="main-content" tabIndex={-1} className="flex-grow">
              <Suspense
                fallback={
                  <p
                    role="status"
                    className="container mx-auto px-4 py-12 text-gray-600"
                  >
                    Loading guide...
                  </p>
                }
              >
                <Routes>
                  <Route path="/search" element={<Search />} />
                  <Route path="/about" element={<Information />} />
                  <Route path="/accessibility" element={<Information />} />
                  <Route path="/sitemap" element={<Information />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/services/:category" element={<Services />} />
                  <Route path="/services" element={<Services />} />
                  <Route
                    path="/services/:category/:documentSlug"
                    element={<Document categoryType="service" />}
                  />
                  <Route
                    path="/government/:category"
                    element={<Government />}
                  />
                  <Route path="/government" element={<Government />} />
                  <Route
                    path="/government/:category/:documentSlug"
                    element={<Document categoryType="government" />}
                  />
                  <Route path="*" element={<Information />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
