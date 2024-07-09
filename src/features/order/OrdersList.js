import { getAllOrders } from "./orderApi";
import OrdersListItems from "./OrdersListItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from "react-router-dom";

const OrdersList = () => {
    let [arr, setArr] = useState([]);
    let [page, setPage] = useState(1); //משתנה זה ישמור באיזה עמוד אני אוחזת
    let [pageCount, setPageCount] = useState(1); //כאן נמלא בטעינת הדף עי קריאה לשרת את כמות הדפים שקיימםי למוצרים
    const items = useSelector(state => state.basket.items);

    useEffect(() => {
        getAllOrders(page)
            .then((res) => {
                setArr(res.data);
            })
            .catch((err) => {
                alert("לא ניתן לטעון את המוצרים");
                console.log("error");
            });
    }, [page]);
    return (<>
        <div className="allProducts">
            {arr.map(item => {
                return (<div className="picture" key={item._id}><Link style={{ textDecoration: "none" }} to={"" + item.ordererid}>{" "}<OrdersListItems one={item} /></Link></div>
                )
            })}
        </div>
    </>);
};
export default OrdersList