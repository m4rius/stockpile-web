import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";

interface ConfirmDeleteDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onConfirm: () => void;
    itemName?: string;
}

export default function ConfirmDeleteDialog({ open, setOpen, onConfirm, itemName }: ConfirmDeleteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bekreft sletting</DialogTitle>
                    <DialogDescription>
                        Er du sikker på at du vil slette "{itemName}"? Denne handlingen kan ikke angres.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Avbryt</Button>
                    <Button variant="destructive" onClick={onConfirm}>Slett</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}