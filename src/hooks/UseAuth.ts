import { useContext } from "react";
import { Context } from "../context/AuthProvider";


export default function UseAuth() {
    return useContext(Context)
}