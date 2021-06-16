import { Filter } from '../components/search/FilterBar';

export default function createFilter(
  title: string,
  slug: string,
  values?: Array<{ name: string; id: number; slug: string }>
): Filter {
  const options = values?.map((value) => ({
    label: value.name,
    value: value.id,
    slug: value.slug,
  }));

  return {
    title,
    slug,
    options: options || [],
  };
}
