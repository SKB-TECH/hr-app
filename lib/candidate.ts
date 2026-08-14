export interface AtsDetailsReturnProps {
  textColor: string;
  bg: string;
}

export const getAtsDetails = (val: number): AtsDetailsReturnProps => {
  if (val >= 80) {
    return {
      textColor: "text-[#56CDAD]",
      bg: "bg-[#56CDAD]/15",
    };
  } else if (val >= 60) {
    return {
      textColor: "text-[#FFB836]",
      bg: "bg-[#FFB836]/15",
    };
  } else {
    return {
      textColor: "text-[#FF6550]",
      bg: "bg-[#FF6550]/15",
    };
  }
};
