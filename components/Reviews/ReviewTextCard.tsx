
type CardProps = {
    article: {
        review: string;
    }
}
export default function PageCard({article}: CardProps) {
    return (
        <div className="justify-center p-4 text-xl font-medium text-center text-white border-4 border-solid rounded-lg grid grow flex-3 temp-rows border-base">
            {/*<h3 className="p-0 m-0 text-2xl text-center">Review</h3>*/}
            <p className="font-medium text-center size-lg">{article.review}</p>
        </div>
    )
}