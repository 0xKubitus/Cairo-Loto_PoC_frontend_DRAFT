export const cropAddress = (value) =>
  `${value.substring(0, 6)}...${value.substring(
    value.length - 4,
    value.length
  )}`;
