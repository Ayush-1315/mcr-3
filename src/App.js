import { useEffect, useState } from "react";
import "./App.css";
import { useSnacks } from "./context/snackContext";
function App() {
  const { filteredData,setSearch,setFilter} = useSnacks();
  const [filterBy,setFilterBy]=useState({field:"",filterBy:null});
  const changeHandler=(type)=>{
    if(filterBy.filterBy===null)
    setFilterBy({field:type,filterBy:"ascending"})
    else if(filterBy.filterBy==="ascending")
    setFilterBy({field:type,filterBy:"descending"});
    else
    setFilterBy({field:type,filterBy:"ascending"})
  }
  useEffect(()=>{
setFilter(filterBy)
  },[filterBy,setFilter])
  return (
    <div className="App">
      <input type="text" placeholder="Search with Product or Ingredients...." onChange={(e)=>setSearch(e.target.value)}/>
      <table>
        <thead>
          <tr>
            <th onClick={()=>changeHandler('id')}>ID</th>
            <th onClick={()=>changeHandler('product_name')}>Product Name</th>
            <th onClick={()=>changeHandler('product_weight')}>Product Weight</th>
            <th onClick={()=>changeHandler('price')}>Price (INR)</th>
            <th onClick={()=>changeHandler('calories')}>Calories</th>
            <th >Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((snack, index) => {
            const {
              id,
              product_name,
              product_weight,
              price,
              calories,
              ingredients,
            } = snack;
            return (
              <tr key={index}>
                <td>{id}</td>
                <td>{product_name}</td>
                <td>{product_weight}</td>
                <td>{price}</td>
                <td>{calories}</td>
                <td>{ingredients.map((ingredient,index)=><span key={index}>{ingredient},</span>)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
