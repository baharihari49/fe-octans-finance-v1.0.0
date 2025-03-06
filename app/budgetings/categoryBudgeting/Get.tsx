import { useEffect, useState } from "react"
import { clientApiRequest } from "@/services/clientApiRequest"
import { Create } from "./create/Create"
import { Edit } from "./edit/Edit"
import { typeSchmeCategoryBudgeting } from "./forms/FormsSchema"

interface data {
    name: string
    transaction_type_id: number
    value: number
    id: string
}

export const Get = () => {

    const [dataKebutuhan, setDataKebutuhan] = useState<data>()
    const [dataKeinginan, setDataKeinginan] = useState<data>()
    const [dataTabungan, setDataTabungan] = useState<data>()
    const [transactionTypeId, setDataTransactionTypeId] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [value, setValue] = useState<number>(0)
    const [open, setOpen] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [errors, setErrors] = useState<typeSchmeCategoryBudgeting>({value: ''})

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await clientApiRequest<{ data: data[] }>({
                    url: 'category-budgetting',
                    method: 'GET'
                });

                // Menentukan tipe hasil reduce agar kompatibel dengan `data`
                const initialState: { kebutuhan?: data; keinginan?: data; tabungan?: data } = {};

                const result = data.reduce((acc, item) => {
                    if (item.transaction_type_id === 3) acc.kebutuhan = item;
                    if (item.transaction_type_id === 4) acc.keinginan = item;
                    if (item.transaction_type_id === 5) acc.tabungan = item;
                    return acc;
                }, initialState);

                // Hanya melakukan satu kali update state
                setDataKebutuhan(result.kebutuhan);
                setDataKeinginan(result.keinginan);
                setDataTabungan(result.tabungan);

            } catch (error) {
                throw new Error("Failed to delete data");
            }
        };
        void getData();
    }, [refresh]);

    const handelClick = ({ parameter, transactionTypeId }: { parameter: string, transactionTypeId: number }) => {
        setOpen(true)
        setName(parameter)
        setDataTransactionTypeId(transactionTypeId)
        setValue(0)
    }

    return (
        <>
            <Create
                open={open}
                setOpen={setOpen}
                name={name}
                transactionTypeId={transactionTypeId}
                value={value}
                setValue={setValue}
                setRefresh={setRefresh}
                setErrors={setErrors}
                errors={errors}
            />
            <div className="grid grid-cols-3 gap-3">
                {dataKebutuhan ? (
                    <div className="bg-white border p-4 space-y-2 rounded-md">
                        <div className="flex justify-between items-center">
                            <p className="font-medium">{dataKebutuhan.name}</p>
                            <Edit
                                setValue={setValue}
                                value={value}
                                setIsEdit={setIsEdit}
                                isEdit={isEdit}
                                parameter={dataKebutuhan.id}
                                name={name}
                                setName={setName}
                                setRefresh={setRefresh}
                                errors={errors}
                                setErrors={setErrors}
                            />
                        </div>
                        <div >
                            <p className="text-xl font-semibold">0</p>
                        </div>
                        <div className="w-full bg-gray-100 rounded-xl">
                            <div style={{
                                width: dataKebutuhan.value + '%'
                            }} className="">
                                <div className="bg-primary rounded-xl flex justify-center">
                                    <p className="text-sm text-white">{dataKebutuhan.value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border p-4 space-y-2 rounded-md">
                        <div className="flex justify-between items-center">
                            <p className="font-medium">Kebutuhan</p>
                        </div>
                        <div
                            onClick={() => handelClick({ parameter: 'Kebutuhan', transactionTypeId: 3 })}
                            className="h-[3.5rem] flex items-center justify-center cursor-pointer hover:bg-gray-100">
                            <p className="text-sm text-gray-500">
                                Klik untuk menambahkan budgeting
                            </p>
                        </div>
                    </div>
                )}


                {dataKeinginan && dataKeinginan ? (
                    <div className="bg-white border p-4 space-y-2 rounded-md">
                        <div className="flex justify-between items-center">
                            <p className="font-medium">{dataKeinginan.name}</p>
                            <Edit
                                setValue={setValue}
                                value={value}
                                setIsEdit={setIsEdit}
                                isEdit={isEdit}
                                parameter={dataKeinginan.id}
                                name={name}
                                setName={setName}
                                setRefresh={setRefresh}
                                errors={errors}
                                setErrors={setErrors}
                            />
                        </div>
                        <div >
                            <p className="text-xl font-semibold">0</p>
                        </div>
                        <div className="w-full bg-gray-100 rounded-xl">
                            <div style={{
                                width: dataKeinginan.value + '%'
                            }} className="">
                                <div className="bg-primary rounded-xl flex justify-center">
                                    <p className="text-sm text-white">{dataKeinginan.value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border p-4 space-y-2 rounded-md">
                        <div className="flex justify-between items-center">
                            <p className="font-medium">Keinginan</p>
                        </div>
                        <div onClick={() => handelClick({ parameter: 'Keinginan', transactionTypeId: 4 })} className="h-[3.5rem] flex items-center justify-center cursor-pointer hover:bg-gray-100">
                            <p className="text-sm text-gray-500">
                                Klik untuk menambahkan budgeting
                            </p>
                        </div>
                    </div>
                )}


                {dataTabungan ? (
                    <div className="bg-white border p-4 space-y-2 rounded-md">
                        <div className="flex justify-between items-center">
                            <p className="font-medium">{dataTabungan.name}</p>
                            <Edit
                                setValue={setValue}
                                value={value}
                                setIsEdit={setIsEdit}
                                isEdit={isEdit}
                                parameter={dataTabungan.id}
                                name={name}
                                setName={setName}
                                setRefresh={setRefresh}
                                errors={errors}
                                setErrors={setErrors}
                            />
                        </div>
                        <div >
                            <p className="text-xl font-semibold">0</p>
                        </div>
                        <div className="w-full bg-gray-100 rounded-xl">
                            <div style={{
                                width: dataTabungan.value + '%'
                            }} className="">
                                <div className="bg-primary rounded-xl flex justify-center">
                                    <p className="text-sm text-white">{dataTabungan.value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border p-4 space-y-2 rounded-md">
                        <div className="flex justify-between items-center">
                            <p className="font-medium">Tabungan</p>
                        </div>
                        <div
                            onClick={() => handelClick({ parameter: 'Tabungan', transactionTypeId: 5 })}
                            className="h-[3.5rem] flex items-center justify-center cursor-pointer hover:bg-gray-100">
                            <p className="text-sm text-gray-500">
                                Klik untuk menambahkan budgeting
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}