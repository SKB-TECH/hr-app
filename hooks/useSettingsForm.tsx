import {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  useForm,
} from "react-hook-form";

interface UseSettingsFormProps<TFieldValues extends FieldValues> {
  defaults?: UseFormProps<TFieldValues>["defaultValues"];
  submitAction?: SubmitHandler<TFieldValues>;
}

function useSettingsForm<TFieldValues extends FieldValues = FieldValues>({
  defaults,
  submitAction,
}: UseSettingsFormProps<TFieldValues> = {}) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFieldValues>({
    defaultValues: defaults,
  });

  const onSubmit: SubmitHandler<TFieldValues> = async (data) => {
    if (submitAction) {
      await submitAction(data);
      return;
    }
  };
  return {
    register,
    watch,
    setValue,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}

export default useSettingsForm;
