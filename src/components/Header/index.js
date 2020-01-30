import React, { Component } from "react";
import style from "./style.module.css";
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <>
        <div className={style.header}>Indic Translator</div>
        <div className={style.login}><Link to="/login">Login</Link></div>
      </>
    );
  }
}

export default Header;
