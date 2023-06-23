import { createContext, useContext, useState } from "react";
import { snacks } from "../db/snackdb";
const SnackContext = createContext();
export const SnackProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    field: "",
    filterBy: "",
  });
  const ingredientFilterFun = (ingredients, string) => {
    return ingredients.reduce(
      (acc, curr) => (curr.includes(string) ? true : acc),
      false
    );
  };
  const filteredData = snacks.filter(
    ({ product_name, ingredients }) =>
      product_name.toLowerCase().includes(search?.toLowerCase()) ||
      ingredientFilterFun(
        ingredients,
        search[0]?.toUpperCase() + search?.slice(1)
      )
  );
  filteredData.sort((p1, p2) => {
    const { field, filterBy } = filter;
    if (filterBy === "descending" && field !== "product_weight") {
      return p1[field] < p2[field] ? 1 : p1[field] > p2[field] ? -1 : 0;
    } else {
      if (filterBy === "ascending" && field !== "product_weight") {
        return p1[field] > p2[field] ? 1 : p1[field] < p2[field] ? -1 : 0;
      }
    }
    if (field === "product_weight") {
      if (filterBy === "descending") {
        return parseInt(p1[field].slice(0, p1[field].indexOf("gm"))) <
        parseInt(p2[field].slice(0, p2[field].indexOf("gm")))
          ? 1
          : parseInt(p1[field].slice(0, p1[field].indexOf("gm"))) >
          parseInt(p2[field].slice(0, p2[field].indexOf("gm")))
          ? -1
          : 0;
      }
      if (filterBy === "ascending") {
        return parseInt(p1[field].slice(0, p1[field].indexOf("gm"))) >
        parseInt(p2[field].slice(0, p2[field].indexOf("gm")))
          ? 1
          :parseInt(p1[field].slice(0, p1[field].indexOf("gm")))<
          parseInt(p2[field].slice(0, p2[field].indexOf("gm")))
          ? -1
          : 0;
      }
    }
    return 0;
  });
  return (
    <SnackContext.Provider value={{ filteredData, setSearch, setFilter }}>
      {children}
    </SnackContext.Provider>
  );
};
export const useSnacks = () => useContext(SnackContext);
