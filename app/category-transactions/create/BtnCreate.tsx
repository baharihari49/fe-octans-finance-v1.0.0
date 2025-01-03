import { Button } from "@/components/ui/button";

interface BtnCreateProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ButtonCreate: React.FC<BtnCreateProps> = ({
    setOpen,
}) => {

    const handleClick = () => {
        setOpen(true)
    }

    return (
        <>
            <Button onClick={() => handleClick()}>
                Tambah Kategori Transaksi
            </Button>
        </>
    )
}