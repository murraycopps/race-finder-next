
type CardProps = {
    article: {
        review: string;
    }
}
export default function PageCard({article}: CardProps) {
    return (
        <div className="grid justify-center p-4 m-4 text-xl font-medium text-center text-white border-4 border-solid rounded-lg grow flex-3 temp-rows bg-slate-400 border-dark">
            <h3 className="p-0 m-0 text-2xl text-center">Review</h3>
            <p className="font-medium text-center size-lg">{article.review}</p>
        </div>
    )
}