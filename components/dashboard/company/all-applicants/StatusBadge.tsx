interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const styles = {
    Interview: "border-[#FFB836] text-[#FFB836] bg-yellow-20",

    Shortlisted: "border-brand text-brand bg-indigo-20",

    Hired: "border-green-500 text-green-600 bg-green-20",

    Declined: "border-red-500 text-red-500 bg-red-20",
  };

  return (
    <span
      className={`px-3 py-2 rounded-full text-xs font-medium border ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status}
    </span>
  );
}
