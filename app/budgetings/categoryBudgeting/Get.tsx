import { Pencil2Icon } from "@radix-ui/react-icons"

export const Get = () => {

    const listData = [
        {
            label: 'Kebutuhan',
            amount: 'Rp 2.500.000',
            persentage: '50%'
        },
        {
            label: 'Keinginan',
            amount: 'Rp 2.500.000',
            persentage: '30%'
        },
        {
            label: 'Tabungan',
            amount: 'Rp 2.500.000',
            persentage: '20%'
        },
    ]

    return (
        <>
            <div className="grid grid-cols-3 gap-3">
                {listData.map((item, index) => (
                    <div key={index} className="bg-white border p-4 space-y-2 rounded-md">
                        <div className="flex justify-between items-center">
                            <p className="font-medium">{item.label}</p>
                            <Pencil2Icon />
                        </div>
                        <div >
                            <p className="text-xl font-semibold">{item.amount}</p>
                        </div>
                        <div className="w-full bg-gray-100 rounded-xl">
                            <div style={{
                                width: item.persentage
                            }} className="">
                                <div className="bg-primary rounded-xl flex justify-center">
                                    <p className="text-sm text-white">{item.persentage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}