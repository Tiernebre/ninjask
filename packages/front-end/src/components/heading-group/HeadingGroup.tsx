type Alignment = 'left' | 'center'

type HeadingGroupProps = {
  title: string;
  subtitle?: string;
  alignment?: Alignment
};

const alignmentClassMap: Map<Alignment, string> = new Map([
  ['left', 'has-text-left'],
  ['center', 'has-text-centered']
])

export const HeadingGroup = ({ title, subtitle, alignment = 'center' }: HeadingGroupProps) => (
  <header className={`${alignmentClassMap.get(alignment)} mb-4`}>
    <h1 className="title">{title}</h1>
    <p role="doc-subtitle" className="subtitle">
      {subtitle}
    </p>
  </header>
);
