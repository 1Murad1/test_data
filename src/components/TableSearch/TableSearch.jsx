import React, {useState} from "react";
import style from "./tableSearch.module.css";

function TableSearch (props) {

    const [value, setValue] = useState("")

    const valueChangeHandler = (event) => {
        setValue(event.target.value)
    }

    return (
        <div className={style.table_search}>
            <input type="text" value={value} onChange={valueChangeHandler} />
            <button className={style.button} onClick={() => props.onSearch(value)}>Search</button>
        </div>
    )
}

export default TableSearch;