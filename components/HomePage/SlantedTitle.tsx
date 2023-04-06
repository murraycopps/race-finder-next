const SlantedTitle = ({ title }: { title: string }) => (
  <div className="relative flex flex-col items-center justify-center w-full h-full py-4 text-gray-800 slanted bg-ronchi-500">
    <h2 className="relative z-10 text-4xl font-bold h-10">{title}</h2>
  </div>
);

export default SlantedTitle;
