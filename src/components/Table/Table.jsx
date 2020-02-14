import React from "react";
import style from "./table.module.css";

function Table (props) {
    if (props.data === undefined) {
        alert("введите корректные данные")
    } else {
        return (
            <table className={style.table}>
                <thead>
                <tr>
                    <th onClick={props.onSort.bind(null, "id")}>
                        Id {props.sortField === "id" ? <small>{props.sort}</small> : null}
                    </th>
                    <th onClick={props.onSort.bind(null, "firstName")}>
                        First Name {props.sortField === "firstName" ? <small>{props.sort}</small> : null}
                    </th>
                    <th onClick={props.onSort.bind(null, "lastName")}>
                        Last Name {props.sortField === "lastName" ? <small>{props.sort}</small> : null}
                    </th>
                    <th onClick={props.onSort.bind(null, "email")}>
                        Email {props.sortField === "email" ? <small>{props.sort}</small> : null}
                    </th>
                    <th onClick={props.onSort.bind(null, "phone")}>
                        Phone {props.sortField === "phone" ? <small>{props.sort}</small> : null}
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    props.data.map(item => (
                        <tr key = {item.id + item.phone} onClick={props.onRowSelect.bind(null, item)}>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    }

}

export default Table;