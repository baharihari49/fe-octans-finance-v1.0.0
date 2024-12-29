import { Button } from "@/components/ui/button";

interface BtnCreateProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ButtonCreate: React.FC<BtnCreateProps> = ({
    setOpen
}) => {
    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Tambah Transaksi
            </Button>
        </>
    )
}