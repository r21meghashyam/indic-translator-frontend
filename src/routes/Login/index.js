import React,{Component} from 'react';
import style from  './style.module.css';
import {bind} from '../../lib/utils';
import {Link} from 'react-router-dom';

class Login extends Component{
  
  // constructor(props){
  //   super(props);
    
  // }
  
  render() {
    console.log(this.state);
    return (
      <form className={style.login}>
        <h1>Login</h1>
        <div className={style.input}>
          <label>Email:</label>
          <input name="email" onChange={(e)=>bind(this,e)}/>
        </div>
        <div>
          <Link to="/forgot-password">Forgot password</Link>
        </div>
        <div className={style.input}>
          <label>Password:</label>
          <input name="password" type="password" onChange={(e)=>bind(this,e)}/>
        </div>
        <div className={style.button}>
          <button>Login</button>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
      </form>
    );
  }

} 

export default Login;
