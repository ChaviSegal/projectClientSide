import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Basket from "../order/Basket";
import ListItem from "./ListItem";
import { getAllProducts } from "./productApi"
import { useSelector } from 'react-redux';
import NavBar from "../../NavBar";
import Button from '@mui/material/Button';
import "./Products.css"


const List = () => {
  let [arr, setArr] = useState([]);
  let [page, setPage] = useState(1); //משתנה זה ישמור באיזה עמוד אני אוחזת
  let [pageCount, setPageCount] = useState(1); //כאן נמלא בטעינת הדף עי קריאה לשרת את כמות הדפים שקיימםי למוצרים

  useEffect(() => {
    getAllProducts(page)
      .then((res) => {
        setArr(res.data);
      })
      .catch((err) => {
        alert("לא ניתן לטעון את המוצרים");
        console.log("error");
      });
  }, [page]);

  return (<>
  {/* <NavBar className="NavBar"/> */}
    <div className="allProducts">
      
      {arr.map(item => {
        return (<div className="picture" key={item._id}>{" "}<ListItem one={item} /></div>
        )
      })}
    </div>
    <div className="pagenationButtons">
    <Button className="prevPage" onClick={() => { page > 1 && setPage(page - 1) }} variant="contained" style={{ backgroundColor: '  #A76CED', color: '#fff' }}> לעמוד הקודם</Button>
    <Button className="nextPage" onClick={() => { setPage(page + 1) }} variant="contained" style={{ backgroundColor: '  #A76CED', color: '#fff' }}> לעמוד הבא</Button>
    </div>
    <Outlet />
  </>);
};

export default List;