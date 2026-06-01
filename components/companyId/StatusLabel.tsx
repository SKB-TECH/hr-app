type Props = {
  label?: string;
  style?: React.CSSProperties;
  className?: string;
};

function StatusLabel({ label = "add label name", style, className }: Props) {
  return (
    <div
      role="status"
      className={
        "flex items-center justify-center   w-fit  rounded-full px-4 py-1.5 text-sm " +
        className
      }
      style={style}
    >
      <span>{label}</span>
    </div>
  );
}

export default StatusLabel;
