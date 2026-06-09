import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

export function ProgressWithLabel() {
  return (
    <Field className="w-full ">
      <FieldLabel htmlFor="progress-upload">
        <span>5 Applied</span>
        <span className="font-normal text-neutral-80">of 10 capacity</span>
      </FieldLabel>
      <Progress value={66} id="progress-upload" />
    </Field>
  );
}
