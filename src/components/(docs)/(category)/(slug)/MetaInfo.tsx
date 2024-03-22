interface MetaInfoProps {
    readTime: number;
    viewCount: number | null;
}

const MetaInfo: React.FC<MetaInfoProps> = ({ readTime, viewCount }) => (
    <div className="text-zinc-400 mx-auto p-2 mb-4">
        {readTime} min read • {viewCount !== null ? viewCount : "Loading"} views
    </div>
);

export default MetaInfo;