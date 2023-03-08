import PageWrapper from "@/components/PageWrapper";

export default function Reviews() {
  return (
    <PageWrapper page="Reviews" className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <img src="/images/review-landing.jpg" alt="Reviews" className="fixed top-0 cover bottom-16 opacity-20"/>
        <h1 className="text-orange-500 text-8xl" >Reviews</h1>
        <div className="flex flex-row gap-4 ">

        <a>
    <p>Reviews page</p>

        </a>
        <a>
            <p>Reviews page</p>

        </a>
        </div>

    </PageWrapper>
  );
}