import React from 'react';

const Login = () => (
  <div id="Login" >
    <div className="row" >
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="imgHolder">
        <div className="hovereffect">
          <img className="img-responsive" id="img" alt="" />
          <div className="overlay">
            <h2 style={{ fontSize: '70px' }} >ATHESIO </h2>
            <em style={{ color: '#ffff' }} >Join your team in a collaborative editing experience.</em>
            <p>
              <a style={{ fontSize: '30px' }} href="/auth/github">Sign in with Github</a>
            </p>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default Login;
