import fs from "fs";
import path from "path";
import matter from "gray-matter";
import DocsIndexPageHeader from "@/components/(docs)/DocsIndexPageHeader";
import CategoryList from "@/components/(docs)/CategoryList";
import Head from "next/head";

interface DocsIndexPageProps {
    slug: string;
    frontmatter: {
        category: string;
    };
}

const readDocsFiles = (docsDirectory: string): DocsIndexPageProps[] => {
    return fs.readdirSync(docsDirectory).map((fileName) => {
        const filePath = path.join(docsDirectory, fileName);
        const { data } = matter(fs.readFileSync(filePath, "utf-8"));

        return {
            slug: fileName.replace(/\.mdx$/, ""),
            frontmatter: {
                category: data.category || "Uncategorized",
            },
        };
    });
};

const getCategories = (docs: DocsIndexPageProps[]): string[] => {
    return Array.from(new Set(docs.map(doc => doc.frontmatter.category)));
};

const DocsIndexPage: React.FC<{ categories: string[] }> = ({ categories }) => {
    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto my-10">
            <Head>
                <title>CPPVault // Docs</title>
                <meta name="og:title" content="CPPVault // Docs" />
                <meta name="og:description" content="A collection of open-source CPP docs" />
            </Head>
            <DocsIndexPageHeader />
            <CategoryList categories={categories} />
        </div>
    );
};

export async function getStaticProps() {
    const docsDirectory = path.join(process.cwd(), "src", "docs");
    const docs = readDocsFiles(docsDirectory);
    const categories = getCategories(docs);

    return { props: { categories } };
}

export default DocsIndexPage;