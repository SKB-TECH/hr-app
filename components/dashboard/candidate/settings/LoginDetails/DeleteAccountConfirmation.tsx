import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteAccountConfirmationProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isPending: boolean;
  handleDelete: () => void;
}

function DeleteAccountConfirmation({
  isModalOpen,
  setIsModalOpen,
  isPending,
  handleDelete,
}: DeleteAccountConfirmationProps) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-md p-6 rounded-lg bg-white border border-brand-light-neutral shadow-xl">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-red-50 text-[#FF6550] shrink-0 border border-red-100">
            <AlertTriangle size={24} />
          </div>

          <DialogHeader className="p-0 gap-1.5">
            <DialogTitle className="text-lg font-bold font-epilogue text-neutral-100">
              Close Account?
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-60 font-epilogue leading-relaxed">
              Are you sure you want to close your account? This action is
              permanent and will remove all your profile data, application
              history, and saved preferences. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t-0 p-0 bg-transparent">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            disabled={isPending}
            className="w-full sm:w-auto h-11 px-5 border-gray-300 text-neutral-100 font-semibold hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="w-full sm:w-auto h-11 px-5 bg-[#FF6550] hover:bg-[#e0503c] text-white font-semibold flex items-center justify-center gap-2 transition-colors rounded-lg border-none"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Closing Account...
              </>
            ) : (
              "Delete Account"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAccountConfirmation;
