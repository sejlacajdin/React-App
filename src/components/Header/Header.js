import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import auth from "../../auth";
import { connect } from "react-redux";

import { setToken } from "../../redux/actions";
import './Header.css';
const Header=(props)=>{
     let history=useHistory();
    
    return (
        <div className="header">
        <nav>

      <div className="header__rightSide">
        {
                auth.isAuthenticated() ?
            <div onClick={() => auth.logout(() => {
                props.tokenState.token=null;
                history.push("/login");
              })}>
                <span>Odjavi se</span>
            </div>
            :
            <Link to="/login">
                Prijavi se
            </Link>
        }
      </div>
        </nav>

        </div>
    );
}
const mapStateToProps = (state) => ({
    tokenState: state.tokenReducer,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    tokenReducer: (data) => dispatch(setToken(data)),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header);