interface AuthorsProps {
    authors: string[];
}

const Authors: React.FC<AuthorsProps> = ({ authors }) => {
    return (
        <div className="mt-8 flex">
            <p className="font-bold mr-2">Authors:</p>
            {authors.map((author, index) => (
                <p key={index} >
                    <a className="link" href={`https://github.com/${author}`}>{author}</a>
                    {index !== authors.length - 1 && ", "}
                </p>
            ))}
        </div>
    );
};

export default Authors;