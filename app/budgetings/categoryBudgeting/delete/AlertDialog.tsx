import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { SubmitDelete } from "./SubmitDelete";

interface AlertDialogDeleteProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    parameter: string;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlertDialogDelete: React.FC<AlertDialogDeleteProps> = ({
    setOpen,
    open,
    setRefresh,
    parameter,
    setOpenDialog
}) => {

    const handleDelete = async () => {
        try {
            const response = await SubmitDelete({ parameter });
            if (response.status === 200) {
                setOpen(false);
                setRefresh((prevRefresh) => !prevRefresh);
                setOpenDialog(false);
            }
        } catch (error) {
            throw new Error("Failed to delete data");
        }
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                <Button onClick={() => setOpen(true)} variant="destructive">Hapus</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus data yang dipilih secara permanen dan menghapus data kamu dari server kami.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Kembali</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive" onClick={() => void handleDelete()}>Setuju</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
