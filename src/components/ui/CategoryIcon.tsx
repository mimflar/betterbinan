import {
  Book,
  Building2,
  ChartBar,
  FileText,
  GraduationCap,
  Heart,
  Home,
  MessagesSquare,
  Newspaper,
  Shield,
  Trash2,
  TreePine,
  Users,
  Wheat,
  Wrench,
} from 'lucide-react';
const icons = {
  Book,
  Building2,
  ChartBar,
  FileText,
  GraduationCap,
  Heart,
  Home,
  MessagesSquare,
  Newspaper,
  Shield,
  Trash2,
  TreePine,
  Users,
  Wheat,
  Wrench,
};
export default function CategoryIcon({
  name,
  className = 'h-6 w-6',
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name as keyof typeof icons] || FileText;
  return <Icon className={className} aria-hidden="true" />;
}
