import {
  Children,
  isValidElement,
  useEffect,
  useState,
  type ReactNode,
  type HTMLAttributes,
  type ReactElement,
} from 'react';
import { Table, List } from 'lucide-react';
import type { TypographyTheme } from './typographyThemes';

type TableElement = ReactElement<{
  children?: ReactNode;
  node?: { tagName?: string };
}>;
const elements = (children: ReactNode): TableElement[] =>
  Children.toArray(children).filter(isValidElement) as TableElement[];
const hasTag = (element: TableElement, tag: string) =>
  element.props.node?.tagName === tag ||
  element.type === tag ||
  String(element.key).includes(`${tag}-`);
const cells = (row: TableElement) =>
  elements(row.props.children).map(cell => cell.props.children);

export const TableWithToggle = ({
  children,
  theme,
  ...props
}: {
  children: ReactNode;
  theme: TypographyTheme;
} & HTMLAttributes<HTMLTableElement>) => {
  const [viewMode, setViewMode] = useState<'table' | 'list'>(() =>
    window.matchMedia('(max-width: 639px)').matches ? 'list' : 'table'
  );
  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const update = () => setViewMode(media.matches ? 'list' : 'table');
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const sections = elements(children);
  const head = sections.find(section => hasTag(section, 'thead'));
  const body = sections.find(section => hasTag(section, 'tbody'));
  const headerRow = head && elements(head.props.children)[0];
  const headers = headerRow ? cells(headerRow) : [];
  const rows = (
    body
      ? elements(body.props.children)
      : sections.filter(section => hasTag(section, 'tr'))
  ).map(cells);
  const canShowList = headers.length > 0 && rows.length > 0;
  return (
    <div className="mb-6 min-w-0">
      <div
        className="flex justify-end mb-3 gap-2"
        role="group"
        aria-label="Table display"
      >
        <button
          type="button"
          onClick={() => setViewMode('table')}
          aria-pressed={viewMode === 'table'}
          className={`px-3 py-3 text-sm font-medium rounded-md inline-flex items-center gap-2 ${viewMode === 'table' ? 'bg-primary-800 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          <Table size={16} aria-hidden="true" />
          Table
        </button>
        <button
          type="button"
          disabled={!canShowList}
          onClick={() => setViewMode('list')}
          aria-pressed={viewMode === 'list'}
          className={`px-3 py-3 text-sm font-medium rounded-md inline-flex items-center gap-2 ${viewMode === 'list' ? 'bg-primary-800 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          <List size={16} aria-hidden="true" />
          List
        </button>
      </div>
      {viewMode === 'list' && canShowList ? (
        <div className="space-y-4">
          {rows.map((row, index) => (
            <dl
              key={index}
              className="rounded-lg border border-gray-200 p-4 space-y-4"
            >
              {headers.map((header, column) => (
                <div key={column}>
                  <dt className="text-sm font-semibold text-gray-900 mb-1">
                    {header}
                  </dt>
                  <dd className="text-sm leading-relaxed text-gray-700">
                    {row[column] || '\u2014'}
                  </dd>
                </div>
              ))}
            </dl>
          ))}
        </div>
      ) : (
        <div
          role="region"
          aria-label="Service information table, scroll horizontally if needed"
          tabIndex={0}
          className="overflow-x-auto rounded-lg border border-gray-200"
        >
          <table {...props} className={theme.components.table}>
            {children}
          </table>
        </div>
      )}
    </div>
  );
};
