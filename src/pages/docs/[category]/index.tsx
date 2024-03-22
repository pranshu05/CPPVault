import fs from "fs";
import path from "path";
import matter from "gray-matter";
import DocsList from "@/components/(docs)/(category)/DocsList";
import Head from "next/head";

interface Frontmatter {
    title: string;
    description: string;
    category: string;
}

interface CategoryPageProps {
    slug: string;
    frontmatter: Frontmatter;
}

const CategoryPage: React.FC<{ category: string; docs: CategoryPageProps[] }> = ({ category, docs }) => {
    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto my-10">
            <Head>
                <title>CPPVault</title>
                <meta name="og:title" content="CPPVault // ${category}" />
                <meta name="og:description" content="A collection of open-source CPP docs" />
            </Head>
            <h1 className="text-5xl font-bold text-center">{category}</h1>
            <DocsList docs={docs} />
        </div>
    );
};

export async function getStaticPaths() {
    const docs = fs.readdirSync(path.join(process.cwd(), "src", "docs")).map((fileName) => {
        const filePath = path.join(process.cwd(), "src", "docs", fileName);
        const { data } = matter(fs.readFileSync(filePath, "utf-8"));

        return {
            slug: fileName.replace(/\.mdx$/, ""),
            category: data.category || "Uncategorized",
        };
    });

    const categories = Array.from(new Set(docs.map(doc => doc.category)));

    const paths = categories.map((category) => ({
        params: { category },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { category: string } }) {
    const { category } = params;

    const docs = fs.readdirSync(path.join(process.cwd(), "src", "docs")).map((fileName) => {
        const filePath = path.join(process.cwd(), "src", "docs", fileName);
        const { data } = matter(fs.readFileSync(filePath, "utf-8"));

        return {
            slug: fileName.replace(/\.mdx$/, ""),
            frontmatter: {
                title: data.title || "",
                description: data.description || "",
                category: data.category || "Uncategorized",
            },
        };
    }).filter(doc => doc.frontmatter.category === category);
    return { props: { category, docs } };
}

export default CategoryPage;