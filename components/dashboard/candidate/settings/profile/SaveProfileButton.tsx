import { Button } from "@/components/ui/button";

function SaveProfileButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <div className="flex max-md:w-full md:justify-end">
      <Button
        variant="custom-secondary"
        className="max-md:w-full py-6 px-4 font-medium "
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
export default SaveProfileButton;
