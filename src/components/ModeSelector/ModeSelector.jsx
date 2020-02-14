import React from 'react';
import style from "./modeSelector.module.css";

function ModeSelector (props) {

    const smallUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

    const bigUrl = ` http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

    return (
        <div className={style.selector}>
            <button onClick={() => props.onSelect(smallUrl)}>Small amount of data</button>
            <button onClick={() => props.onSelect(bigUrl)}>Large amount of data</button>
        </div>
    )
}

export default ModeSelector;