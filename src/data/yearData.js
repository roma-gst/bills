import months from "./months";
import monthTemplate from "./monthTemplate";

const yearData = months.map((month) => ({
  nome: month,
  ...structuredClone(monthTemplate),
}));

export default yearData;
