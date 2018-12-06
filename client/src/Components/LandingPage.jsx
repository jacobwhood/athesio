import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import SelectRoom from './SelectRoom.jsx';
import axios from 'axios';
import { Button } from 'reactstrap';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authStatus: false,
      sketch: ""
    }
  }

  async getAuthStatus() {
    return await axios.get('/api/authstatus')
      .then(async authStatus => {
        localStorage.setItem('authenticated', authStatus.data);
        this.setState({
          loading: false
        }, () => {
          if (localStorage.getItem('authenticated') === 'true') this.props.history.push('/selectroom');
        })
      });
  };

  componentDidMount() {
    this.getAuthStatus();
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ backgroundColor: '#1e1f21' }} >
          <img src="https://i2.wp.com/merakidezain.com/wp-content/themes/snskanta/assets/img/prod_loading.gif?w=660" alt=""/>
        </div>
      );
    } else if (!this.state.loading && localStorage.getItem('authenticated') === 'true') {
      return (<ProtectedRoute component={SelectRoom} />);
    } else {
      return (
        <div id="Landing">
          {/*  JUMPING UP TITLE */}
          <div className="row" id="titleBox" >
            <div className="col-xs-12 col-lg-12 text-center" >
              <a className="text-pop-up-top" style={{ fontSize: "250px" }} id="title">ATHESIO</a>
            </div>
            {/* DIVIDER */}
            <div className="text-center" >
              <a style={{ color: '#ffffff' }}>____________________________________________________________________________</a>
            </div>
          </div>
          <div className="row" >
            <div className="col-xs-12 col-lg-12 text-center" >
              <em><h2 id="moto" >  The collaborative coding solution </h2></em>
            </div>
          </div>
          <div className="text-center" id="getStarted" >
            <Button outline color='warning' type='button' onClick={() => this.props.history.push('/login')}> Get Started </Button>
          </div>

          <div className="row" id="LandingTech" >
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALYSURBVGhD7ZoxTxRRFIW31CWraEmlqBURW6NU4j/AKBoKafgBRKMVlNpRIr+EEEs7jdHSQCyMEhMTtUK7Xb6zOWx2ZwZ23oYZHsOc5OS9e9+9+86bzJ2ZN7ONGjVOETqdThPOwPsJytd0WNxA6Hi73d6hzQRj2zTjDo8XCH0AfyM2deTxt+BfOGdXvEDkE/jNZgoaU4zNcsCE1+Cs+xI4lsO3BoctZM39Wahc/UZ3cUf51B8JJN+Dy+5vwIkcvk04bCGb7i9D5eo3Nob51C8NTBjlqbUA39jMBeIfw582U9AYDFqINMAFm+EgWefphM1cIF7n93/4Ab5NUL49rmiTDs8FcnSajdkMB8m9Ig4BOdNwFcGv+4lvBd5yWG5IAzyeYj9JSIO02DzD4CgEF3sRkAZpsRkOkoOLvQhIg7TYDAfJIxX7cUMapMVmOEiui/3EwfX+Equfp12iXYdb7i/C6w4rHMx1Q3N67i247r4egS47LBsEnIc78Bf8muAP+A8G39BCoTmgng6+w6SOP2pZ1OE7TQJuE6BdXOYVAv9nuGKzMDDHC/jR5gDwt6zxjl1pMK49dcdmCiS/g69sFgYkvNRcNlOQRjBjMw0NKsJmCvVCAoGEeiFdkHxQ7C27BoBfxb5qszAwx3P4yeYApM0aDy92Bg8uv91LXIK7cA9OObwwMMdNqEu95kzqkDa9Nzvn8GwQoBdsj2gHbojwKf2rDisczHdFc1pH/w1RN+v4X/AVAlZfjYdGkivzGF+ZjVU1trqVAUfhbBc7OdpP6O6sx/F+PoPTDssNcsovdm5Wk+ToCeA9zHplqg1T0I2V+PKLnXhtRXdtpsCYXmLP28wFaYDlFjsTRvlZoVfstKf3Qw/JvWKnzfrMluWL79PbKNDkMK5TaxQgcg7qE/QFu3qQz2MP7YoX2isgVH8KyARjX2guOjxuILSJ4Lu0WX/hOHpnV6NGTGg09gFY5kYQ8UTQYgAAAABJRU5ErkJggg==" />
                </a>
                <br />
                <a>Collaborative Editing</a>
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center" >
                {/* SVG is for the Github icon */}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  width="50" height="50"
                  viewBox="0 0 50 50"
                  style={{ fill: "#ffffff" }}>
                  <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg> <br />
                <a>GitHub Integration</a>
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANCSURBVGhD7ZlfaI1xGMfPzljT/NnuxsyK0na3c+OKaEqSC8lS5L80uZpdIrnBjdgNUuTEXCiihXJDIheKCymlFu0C03Sas/m7HZ/nfb/nPd7zx8o5+Mn7qW/P7/c83997nmfezXnPiUVEREREOEUmk6lBDQ6pXq1NDuaqiYmJ7egpa+egr4/oCmpTy4XgsyHO+Ue8Q1/Qe1dESym/M6+3NOpQ62EobJEvxXojsVYlZ6Cv2ShpTRLfopkq5SD5yAywVSknoT+7c+5bo8QdSucg+QmNoxlKOQs9dmuQXqVyWAFS2joNA2ywZoknlcrhjREN8meJBnGNaBDXiAYpBt5GLlT4FiEPPHPwTte2JPia0TRtfwq+8gfh8Fz0wMzEccJ5VKNyALWF6Il831Avy7jKAeQT6Ll89kb1kEolwVORQW6bkfgafdD6gMoB5LJDDKIxrbtU9iA1ldyAai/RZ1tDpyxFwVfeINRrOWw/3RFUh5bYIeJDWTzYNyk/SLBm12p/QxYPUu3KPyPEiTu1T8pSFOplDxI3DxewYexiR+0Q61CD7G1I84xSXkM8JV+oQfbNyg+jVeiS9sdkKQr1itxa++X1YG+/J8tUDiB/wnf4sLfbpl3lAPIXfYcPe/vXXqByUaiXP4jBBTaj66iPM4uVDkHebpXdqB8lUUKlEPimUNuLbqGz7FtVKgm+ygzyt4kGcY1oENeIBnGN/2cQCmltnYY+N5UchOSwFWG+Us5Cr0esUeJhpXKQzL5hu0CoUto56G1e9odOXKp0DpL2IGTvVo27rLuInT+K3Dpio44UQD2Rf6ZS4trr0UH0jr0N0a+XLYTicjRkxlJQfyx7CPJt6KtsvxVe5yZhll66OBjqMe4h2iPs5TzZRUZlDUH+jOr2SXn+uYqIax9HK/SSvw4XSXNBa7ZOKQ/2dlva8/YQcv7TfGs4+zsUfJ/Hupr8PUsSu5V2F5pssWYh+E+TtX3pctqSxDuEapXchUZ71PA17e253HtMJQ6gJs/oMvTaiuxDB2Ml613EVxriBWqR1V1osgO9UdNjyPssy2Ddhyb9tNEJaHREfXuwt+8ar6JFsvwb0PA2ZH+/96HVzNKgkkPEYt8BdnYpJkjBPs0AAAAASUVORK5CYII="/></a>
                <br />
                <a>Messaging</a>
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAF9SURBVGhD7ZkxTsNAEEUtJBJuQYOUA9BQcwx66FNFKEUORJWKIiUH4QZUqW3+X/8Ukexk48wslpknjeLdmZ3Zp5AgQRUEQRCMirquF03TPI4peCddLx8c+sLhUcE76Xr5TFIEz3vEzx/FXtcwEXnRdnE4W9cIkUmKTOMzMhZCROfZYI2Xzt+23qHZCQuR+Na6lhA5cIkI8k96NKeYCHJL1Wy0ZQpnp0sA3knb+fCQzveKYP9VJQmszWU4W+1dRe4R3ypLYG0qw9lq7SdCkHOV4Wy19RUhyLvJcLZa+osQ1HTJvCs9GM5Wu2Iic8RORxJYb/Fyo5JBcHbbrYAISu5Q89lWt2g9U8lgOLvt6CyCdKcEYq6Sq+BstfUTQSpLAutdRjyr/Ajs+4tgf6WSBNad74TSJzkxo8g7covch2p6f5yYP0ffDO6rxE+EIE2ZFaL3M4Gat3OB8w8qP4KzkU/g2U/EmxA5ECLGWIvEH+gs+fci0/jXWxAEQeBHVf0CoYQuXFzacZYAAAAASUVORK5CYII="/></a>
                <br />
                <a>Code Execution</a>
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="row" id="LandingTech2" >
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                  <a><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASRSURBVGhD7ZldiFVlFIZHx/zNv0hRRiRzTNEU/9AMEpwLL7wQg25CScQulEIEvbCL8sJgUASJ/AEhSrGg0EEj0ChBosTQi0HJX0RLA9FMSUUlnfF5N+83nNE5w9n7nG/PGfCFl7X3Wt+33rXmzN7729+ueY4c0NLSshT+DL+B4+zuPmhtba2l8K3YNnD+D2aqh1Q/KHgA/N7F34PLOPzO592jGYocQbHHXfQ1OMt+/ULf2l/dzVDgJHjJxZ6BYxxKgLv6m6GwefBfFQmOwKEOtQP+6m2Ggt6DD13c17CPQx2CYdXVDAX0oJBPYIuL+lQ+hzsF4wqbuQFHOZQv0H8B8S9dyP9wuUMlg6lqZr9zbLA7P6A7GOGfXMB/cL5DqcB0/aJ7nWe93fkAzdGInrL4FTjFodRgbqPzXIcj7Y4PxKbDvy3eDOscSg3mrnSeB3C23fGB2AJ4x+KH4ECHUoO5DfARFBbbHR+IrYSP3MROTC+HUoP5k5l/W7nAOrvjAiFdjJukiBU+cigTmD8KXnG+7XbHBVp9YVjo6f/4XYcygTS60510vgOYWofiAZGXEfvVojfhXIcyQUWT47DznYSDHIoHROrheYtehOMdygxybHc+3a7jP8EReRPesOjvcLhDmUGqdcoHbpNvst3xgMg78L4UsU2wn0OZQY7FUHgIG+yOB0TWSs1NbMGUfSGqcBhWxO/bHQcqGJHw/6sH1CqHygJ56kmZPCs4brQ7DtB4EZEfLHYXs8ihskCuYfCC8+7BlLSszwQERiJwwmJt79XlgnT9yXXMeXW77e1Q5YGA3qv/tNhp2O69OitIp39TPeiU9yxmsEOVBwINCIR1TtH36iwg9zYlxWpJXm935UHy+fCexIDu6S85VDbIFZbk2sOKtyQneVsTWF3Ysr/AAR6SGeRYCHXHExfaXXmQvLCJz+FYGK6Rspph7mwYcn9gd+VBcj2UgtBnmORWiH2V87KaYY7WZNedI96SnPza5QhCelq3u59znrkZpmhJHhaWcZfkCNRZ6JJdz4Bw6mYY2ptxYUmuZ0Z/h+IAgVqou9NjWHQVy5iSm2GI3hj1tNbYC3CYQ3GBUJNFl9jVIRhSUjP4k+0boD/QJLvjA7EPpYrdYVdRMKzTZjgPz4p8luSFQHCBxZvs6hQM7bAZrO5+2hYV8tu+CaCeRS6qpEYEhj/dzBsc5rt98zQoYrfUsavtKglMKWwmeeECXzmcL9APu3lXYepdC+a85QbUTNwleTEgPA3h8IaW+jWTOXUwPPB+w8RbkheDmoD6CpSA4z9gybshjC1s4iimS5rQbvlNF7EXNvu4rRlOJ3D8MdwHtRmtD/n66jSX2CvY0ISe2vk3gegMxJOPkVh90tKTXTuGhc18AcPFWxQM0eflLvklZsJbLiJpwiE1qGaSPVeB48twBZwIX4dvQ62MT2D/glqCDPH0fIH4VRepu9RGOIfTno6Nh+HjjD6XdU2RpYACG2HyiwRwrnfnXTA0cRCT/y00LSiyF8Xqo/1meE7FB3D+I6avh3YvUPxrcA3Ut++47wzPUYiamieeQRsmQjDYyQAAAABJRU5ErkJggg=="/></a>
                <br />
                <a>Whiteboarding</a>
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASTSURBVGhD7ZltiFRVGMdXTRFsW9/BIikoUMIvGikqgpqEWdIHw7fIlIVdDVFBUUj8YLIbfdLQFRX2S2xknwqEkMIQKV+pXLINdMWXpLAURY3wZbfff+c/V6eZce89M7NecP/w49znOc/znHNmd+65505Vr8qkjo6OZ+ENWAr18CaMcne61dnZ+QSTXUZ7graDNk+4j8G7XPZ1WrrE5F6CXzzZNtgEMzDH0I6F2bAFLjjmOLzo9DBR5zl4C94uB0yojvYa7d+wmOs+HipP9OmvtgpuwhV4xV3JRGIt3KFgWUXN0/C8h+lWpEwg/rKJnReJpD/gZ3iNYq+WAjVmwZ9wHV7wELFFzkT4F762K54YfDRIG+wqSUxgvorR1tuVWORucY2ZdnUvguc4aY5dQaJEX2pMh1PwO/YAdyUWuYOpoe/LXru6F0kbQBptV2Ix4GT40XX0oWx1V7C0CLhKuXi3ZIJbCL5mM7HI1+Z2G/S92O2FzHd3sKixxrXi3Y4JbIVDNhOJPO0Dd+EHGAFzPfg0hwSLGgtda5JdxUVcfwL1aTbZFVvkVMNFaKdOjX0joQF7YFdQCaKOdnppgl3FRfA4RdIutyu2yFnh3NftKpuo+QF07Wu0+o/RWMW/KwQsUjCaaldskXsQzpJbdMcOFXVnwE5zXhOkPQojHJIrOhoVhLr+NZKI3BvQbLNiYm66rdeBvgJHsPu7677o2AfnbcaWimv15DbaVXExVr3HXGLXfWkRsM9mbGkh5P0Du+yquBizH+Pp2e2IXRnRUeMVBn2q5P0kbPaIGK8ZbtrMiDVM9UIW2ZVI5G10/st2VVxeyA2bGeFY7omMsyuRyBsFesI9TJng56q4Yow+jHUGcjdvHE1wm4D8u0BMkf++P4y9NCVvgg/TA2PV2pURjkPQajNY1PjQA+g8M8vusonSOj2uBj0KHcTu566McOgY2mKzJFHnHfjLC7pI8wXtNtqPQiH/Y/gUsuf5AzDMQ2aEv6yHKYlaTzLQStgPl6DkozM1dH7/BvQAmf+IQkdZDlOVEvOKdyMipuTDVCXFvOJtDQSUdJiqtJhbvM2agODDVE+J+enx6Sub+WKhwYepnhTz0wPtWZv5ojN7mKqzK5Vifo0gVduVKzqyZ2E99OnWllbaPM/CZ3Y6sre2VpoTaYX5/UareRbeIrILQam89WbF/LK34Md4IfiCn4TLLeaSfCH4hsK3cA9Owlh3xRY5gyB6+079GuzopwGu9QLvaZuy9TNc9BCoWHjKZvBCtmLraXgN/AoH7H8G1sF6o9yCr3/oa4Do9Mb1LmizKVv7QrQJc30YPrcpWy/7dtgMXsiX8L2vt8M5Xy+G6Hc/Lm/RDFff/0Vfk2Jsym6B6A0N1znnH11D9OKD1JxjBXbQQhbIQdsOUoO71FdN1xBT9BRI3Fz4zKYm8h72dpvqXwubbcrWhrfSpuw9sNBm2EIkJcAnsJS+R/7rKnMIW0jaxPwen4XMc4Be/xf8QTMNML9mWqnwzwp0DCDou0xMusU8H/5yhBi9R51CW/DH/jTA/MZ7ur3qVa8SqarqP6fmK/ZUpY11AAAAAElFTkSuQmCC" />
                </a>
                <br />
                <a>Cloud Storage</a>
              </p>
              
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
              </p>
            </div>
          </div>
          <div className="text-center" >
            <a style={{ color: '#ffffff' }}>____________________________________________________________________________</a>
          </div>
          <div className="row" >
            <div className="col-xs-12 col-md-12 col-lg-12" >
              <div className="text-center" >
                <h3>Our Team</h3>
              </div>
            </div>
            {/* First row of our team */}
            <div className="row" >
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                <div className="row" >
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                    <p className="text-right" >
                      <a>
                        <img src="https://avatars1.githubusercontent.com/u/20894704?s=460&v=4" alt="img" style={{ height: '70px', width: '70px' }} />
                      </a>
                      <br />
                      <label className="dev-team-name-label">Jacob Hood</label>
                    </p>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                    <em>Full Stack Engineer</em>
                    <p></p>
                    <a href="https://github.com/jacobwhood">Github</a>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                <div className="row" >
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                    <p className="text-right" >
                      <a>
                        <img src="https://avatars0.githubusercontent.com/u/40183724?s=96&v=4" alt="img" style={{ height: '70px', width: '70px' }} />
                      </a>
                      <br />
                      <label className="dev-team-name-label">Shawn Acevedo</label>
                    </p>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                    <em>Full Stack Engineer</em>
                    <p></p>
                    <a href="https://github.com/shawnxa">Github</a>
                  </div>
                </div>
              </div>
            </div>
              {/* Second row of our team */}
              <div className="row" >
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                  <div className="row" >

                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                      <p className="text-right" >
                        <a>
                          <img src="https://avatars2.githubusercontent.com/u/26049245?s=96&v=4" alt="img" style={{ height: '70px', width: '70px' }} />
                        </a>
                        <br />
                      <label className="dev-team-name-label">Sieh Johnson</label>
                      </p>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                      <em>Full Stack Engineer</em>
                      <p></p>
                      <a href="https://github.com/siehj">Github</a>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                  <div className="row" >
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                      <p className="text-right" >
                        <a>
                          <img src="https://avatars1.githubusercontent.com/u/31697282?s=460&v=4" alt="img" style={{ height: '70px', width: '70px' }} />
                        </a>
                        <br />
                      <label className="dev-team-name-label">Taro Yamashita</label>
                      </p>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                      <em>Full Stack Engineer</em>
                      <p></p>
                      <a href="https://github.com/taroyamashita">Github</a>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
    }
  }

}

export default withRouter(LandingPage);
