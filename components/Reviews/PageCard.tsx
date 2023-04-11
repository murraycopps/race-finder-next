type CardProps = {
    item: {
        name: string,
        img: string,
        link: string,
        brand: string,
        brandLink: string,
        brandLogo: string,

}
}
export default function PageCard({item}: CardProps) {
    return (
        <div className="grid grid-cols-2 p-4 m-1 font-medium text-white leading-6 ">
                        <h1 className="bg-slate-400 rounded-lg p-0.5 w-full text-3xl">{item.name}</h1>
                        <img
                            src={item.img}
                            alt={item.name}
                            width="400"
                            height="400"
                        />

                        <div className="justify-center p-4 m-4 text-lg font-medium text-center text-white rounded-lg grid leading-6 bg-slate-400">
                            <h2 className="p-0 m-0 text-3xl text-center">Purchase</h2>
                            <div className="flex justify-center gap-2">
                                <a className="w-24 h-24 p-2 bg-white rounded-lg hover:opacity-50 grid place-items-center" href={item.link}>
                                    <img
                                        className="block overflow-hidden bg-transparent opacity-100 rounded-md transition-background"
                                        src="https://media.licdn.com/dms/image/C4E0BAQHBmWI9w3tzog/company-logo_200_200/0/1544572615288?e=2147483647&v=beta&t=HhwAog-YBLZyc1ULuVv48MZefPUw3EHejmW25OtMwUQ"
                                        alt="running warehouse"

                                    />
                                </a>

                                <a className="w-24 h-24 p-2 bg-white rounded-lg hover:opacity-50 grid place-items-center" href={item.brandLink}>
                                    <img
                                        className="block overflow-hidden bg-transparent opacity-100 rounded-md transition-background"
                                        src={item.brandLogo}
                                        alt={item.brand}

                                    />
                                </a>
                            </div>
                        </div>
                    </div>
    )



}