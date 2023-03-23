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
        <div className="flex flex-col justify-center p-4 m-1 font-medium leading-6 text-white item-center align-center">
                        <h1 className="bg-slate-400 rounded-lg p-0.5 w-full text-2xl">{item.name}</h1>
                        <img
                            src={item.img}
                            alt={item.name}
                            width="400"
                            height="400"
                        />

                        <div className="grid justify-center p-4 m-4 text-lg font-medium leading-6 text-center text-white rounded-lg bg-slate-400">
                            <h2 className="p-0 m-0 text-3xl text-center">Purchase</h2>
                            <div className="flex justify-center gap-2">
                                <a className="hover:opacity-50 w-24 h-24 bg-white grid place-items-center rounded-lg p-2" href={item.link}>
                                    <img
                                        className="block overflow-hidden bg-transparent rounded-md opacity-100 transition-background"
                                        src="https://media.licdn.com/dms/image/C4E0BAQHBmWI9w3tzog/company-logo_200_200/0/1544572615288?e=2147483647&v=beta&t=HhwAog-YBLZyc1ULuVv48MZefPUw3EHejmW25OtMwUQ"
                                        alt="running warehouse"

                                    />
                                </a>

                                <a className="hover:opacity-50 w-24 h-24 bg-white grid place-items-center rounded-lg p-2" href={item.brandLink}>
                                    <img
                                        className="block overflow-hidden bg-transparent rounded-md opacity-100 transition-background"
                                        src={item.brandLogo}
                                        alt={item.brand}

                                    />
                                </a>
                            </div>
                        </div>
                    </div>
    )



}