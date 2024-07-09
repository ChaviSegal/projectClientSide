import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import ListItem from "./ListItem";
import { getAllProducts, getProductByCategory, amountProduct } from "./productApi"
import "./Products.css"
import Button from '@mui/material/Button';

const Carriages = () => {
  let params = useParams;
  let [arr, setArr] = useState([]);
  let [page, setPage] = useState(1);
  let [pageCount, setPageCount] = useState(1);

  const fetchData = async () => {
    try {
      let res = await amountProduct("Carriages");
      const amountOfPages =
        res.data.count % 12 === 0
          ? res.data.count / 12
          : Math.floor(res.data.count / 12) + 1;
      
      if (res.data.count === 0) {
        // אם אין מוצרים בקטגוריה זו
        setArr([]); // איפוס המוצרים
        setPageCount(1); // קביעת מספר העמודים ל-1
      } else {
        setPageCount(amountOfPages); // קביעת מספר העמודים הכולל
        getProductByCategory("Carriages", page, 12).then((res) => {
          setArr(res.data);
        });
      }
    } catch (err) {
      alert("Unable to load the products");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleNextPage = () => {
    // בדיקה האם יש עמודים נוספים להצגה
    if (page < pageCount) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    // בדיקה האם העמוד הנוכחי הוא לא הראשון
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <img src="../../pictures/עגלותוטיולוניםערכתנושא.png"></img>
      <h1>עגלות וטיולונים</h1>
      <div className="allProducts">
        {arr.map((item) => (
          <div className="picture" key={item._id}>
            <Link style={{ textDecoration: "none" }} to={"" + item._id}>
              {" "}
              <ListItem one={item} />
            </Link>
          </div>
        ))}
      </div>
      <div className="pagenationButtons">
        <Button
          className="prevPage"
          onClick={handlePrevPage}
          variant="contained"
          style={{
            backgroundColor: "#A76CED",
            color: "#fff",
            marginRight: "2%",
          }}
        >
          לעמוד הקודם
        </Button>
        {page}עמוד
        <Button
          className="nextPage"
          onClick={handleNextPage}
          variant="contained"
          style={{ backgroundColor: "#A76CED", color: "#fff" }}
        >
          לעמוד הבא
        </Button>
      </div>
      <Outlet />
    </>
  );
};

export default Carriages;
