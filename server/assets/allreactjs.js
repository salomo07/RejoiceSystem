class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={friends: [{},{},{},{},{},{}]};
  }
  componentDidMount(){
    // this.setState({movies: "jhgfdfhghjkkl"})
  }
  render() {
    if(this.state.friends !==undefined && this.state.friends.length>0){
      return this.state.friends.map(()=>{
        return (
          <li class="">
            <div class="d-flex bd-highlight">
                <div class="img_cont">
                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img"></img>
                    <span class="online_icon"></span>
                </div>
                <div class="user_info">
                    <span>Khalid</span>
                    <p>Kalid is online</p>
                </div>
            </div>
          </li>
        )
      });
    }
    else
    {
      return (
        <li class="" style={{"border": "0.5px solid gray","borderRadius": "25px"}}>
          <div class="d-flex bd-highlight">
              <div class="img_cont">
                  <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img"></img>
                  <span class="online_icon"></span>
              </div>
              <div class="user_info">
                  <span>Khalids</span>
                  <p>Kalid is online</p>
              </div>
          </div>
        </li>
      )
    }
  }
}

class ButtonLogin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button class="login100-form-btn" onClick={()=>
      {
      }}>
        Sign In
      </button>
    );
  }
}

if($('#friendlist').length>0){
  ReactDOM.render(<FriendList/>, document.querySelector('#friendlist'));
}
if($('#divbtnlogin').length>0){
  ReactDOM.render(<ButtonLogin/>, document.querySelector('#divbtnlogin'));
}
// 
