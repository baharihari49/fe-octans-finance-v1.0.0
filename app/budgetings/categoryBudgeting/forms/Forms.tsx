import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { typeSchmeCategoryBudgeting } from "./FormsSchema";
import { useEffect } from "react";

interface FormProps {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
    errors: typeSchmeCategoryBudgeting
}

export const Forms: React.FC<FormProps> = ({
    setValue,
    value,
    errors
}) => {

    useEffect(() => {
        console.log(errors)
    } ,[errors])

    return (
        <>
            <Label htmlFor="amount" className="text-sm font-semibold text-mauve12">
                Jumlah
            </Label>
            <Input
                onChange={(e) => setValue(Number(e.target.value))}
                value={value}
                id="amount"
                name="amount"
                type="number"
                placeholder="Jumlah kategori anggaran"
                className="mt-1"
            />
            {errors?.value && <p className="text-red-500 text-sm">{errors?.value}</p>}
        </>
    )
}