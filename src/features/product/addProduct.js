import { useDispatch } from "react-redux"
import {AddToArr} from "./productSlice"
import { useForm } from "react-hook-form"

const Addproduct=()=>{
    let dispatch = useDispatch
    let {register, handleSubmit}=useForm();
    const save = (data) => {
        dispatch(AddToArr(data));
    }
return(
    <>
    <form onSubmit={handleSubmit(save)}>
        <label>הכנס שם</label>
        <input {...register("name")}/>
        <label>הכנס מחיר</label>
        <input {...register("price")}/>
        <label>הכנס תאור</label>
        <input {...register("descripttition")}/>
        <label>הכנס תמונה</label>
        <input {...register("src")}/>
        <input type="submit" />
    </form>
    </>
)

}