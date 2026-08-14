interface ToolTipProps {
  active: boolean;
  payload: {
    value: string;
  }[];
}

function CustomListingToolTip({ active, payload }: ToolTipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#515B6F",
        color: "#fff",
        padding: "18px 20px",
        borderRadius: 4,
      }}
    >
      <p style={{ margin: 0, color: "#56CDAD" }}>
        ● <span style={{ color: "#fff" }}>Views</span>
      </p>

      <h3 style={{ marginTop: 10 }}>{payload[0].value}</h3>
    </div>
  );
}

export default CustomListingToolTip;
