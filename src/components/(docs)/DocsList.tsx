import DocsItem from "./DocsItem";

interface DocsListProps {
    docs: { slug: string; frontmatter: { title: string; date: string; description: string; readTime: number; img: string } }[];
    viewCounts: { [key: string]: number };
}

const DocsList: React.FC<DocsListProps> = ({ docs, viewCounts }) => (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
        {docs.map(({ slug, frontmatter }) => (
            <DocsItem key={slug} slug={slug} title={frontmatter.title} date={frontmatter.date} description={frontmatter.description} viewCount={viewCounts[slug]} img={frontmatter.img} />
        ))}
    </div>
);

export default DocsList;