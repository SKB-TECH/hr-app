export interface AtsDetailsReturnProps {
  chanceText: string;
  textColor: string;
}

export const getAtsDetails = (val: number): AtsDetailsReturnProps => {
  if (val >= 80) {
    return {
      chanceText: "High Chance",
      textColor: "text-[#56CDAD]",
    };
  } else if (val >= 60) {
    return {
      chanceText: "Good Chance",
      textColor: "text-[#FFB836]",
    };
  } else {
    return {
      chanceText: "Moderate Chance",
      textColor: "text-[#FF6550]",
    };
  }
};
