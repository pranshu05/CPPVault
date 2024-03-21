import DocsItem from './DocsItem';

interface DocsListProps {
    docs: { slug: string; frontmatter: { title: string; description: string; readTime: number; img: string; category: string } }[];
}

const DocsList: React.FC<DocsListProps> = ({ docs }) => (
    <div className='w-full flex flex-col gap-6 mt-10'>
        {docs.map(({ slug, frontmatter }) => (
            <DocsItem key={slug} slug={slug} title={frontmatter.title} description={frontmatter.description} img={frontmatter.img} category={frontmatter.category} />
        ))}
    </div>
);

export default DocsList;