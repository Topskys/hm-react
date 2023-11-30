import { useParams, useSearchParams } from "react-router-dom";

const Article = () => {

    // /article?id=1&name=topsky
    // const [params]=useSearchParams();
    // const id=params.get('id');
    // const name=params.get('name');

    // /article/:id
    const params=useParams();
    const id=params.id;
    const name=params.name;

    return (
        <div>
            <h1>Article</h1>
            {id}-{name}
        </div>
    )
}

export default Article;