import React, { Component } from "react";
import style from "./style.module.css";
import { bind } from "../../lib/utils";

export default class Register extends Component {
  // constructor(props){
  //   super(props);

  // }
  componentDidMount(){
    this.init();
  }
  async init(){

  }

  render() {
    console.log(this.state);
    return (
      <form className={style.login}>
        <h1>Register</h1>
        <div className={style.input}>
          <label>Name:</label>
          <input name="name" onChange={e => bind(this, e)} />
        </div>
        <div className={style.input}>
          <label>Email:</label>
          <input name="email" onChange={e => bind(this, e)} />
        </div>
        <div className={style.input}>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            onChange={e => bind(this, e)}
          />
        </div>
        <div className={style.input}>
          <label>Select the languages you are good at:</label>
          
        </div>
        <div className={style.button}>
          <button>Register</button>
        </div>
      </form>
    );
  }
}
