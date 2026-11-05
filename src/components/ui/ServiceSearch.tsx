import { Search } from 'lucide-react';
export default function ServiceSearch({ query = '' }: { query?: string }) {
  return (
    <form action="/search" role="search" className="service-search">
      <label htmlFor="service-query" className="sr-only">
        Search services and information
      </label>
      <Search className="h-5 w-5 shrink-0 text-gray-600" aria-hidden="true" />
      <input
        id="service-query"
        name="q"
        type="search"
        defaultValue={query}
        placeholder="Search services or topics"
        className="min-w-0 flex-1 bg-transparent text-gray-900 outline-none"
      />
      <button type="submit" className="primary-button">
        Search
      </button>
    </form>
  );
}
