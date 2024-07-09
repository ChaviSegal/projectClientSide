import { useNavigate, useParams } from "react-router-dom";

const DDetails = () => {
    let params = useParams();
    let navigate = useNavigate();
    //שלפנו את הid
    //ועכשיו נרצה להציג מייד את כל הפרטים אז נעשה קריאה לשרת שמחזירה
    //פרטי קורס לפי קוד קורס

    
    return (
        <div style={{ position: "fixed", top: 0, width: '100vw', height: '100vh', backgroundColor: "white" }}>
            {/* {" "} */}
            <h1>details {params.id}</h1>

            <div style={{ marginTop: "50%" }}>{params.productName}</div>
            <div style={{}}>{params.price}</div>
            <div style={{}} className="dialogDescript">{params.descripttion}</div>
            
            <input type="button" value={"back"} onClick={() => {
                navigate(-1)
                // navigate("/list")

            }} />
        </div>
    );
};

export default DDetails;