const React = require('react')

const mkApi = require('@addaps/addaps_client_api')

const Ru = require('rutils/lib')

let styles = {
    container: {
        display: 'flex',
        flexDirection:'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        fontFamily: "Avenir, serif",
        right: 0,
        backgroundImage: 'url("https://www.addaps.com/img/background.png")',
        backgroundColor: '#fff',
        backgroundSize: 'cover',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,.5)'
    },
    title:{
        color: '#FF6C6F',
        fontSize: '40px',
        marginLeft: '30px',
        marginRight: '30px',
        textAlign: 'center',
        marginTop: '100px',
    },
    mainFooter: {
        position: 'absolute',
        right: '0',
        bottom: '0',
        left: '0',
    },
    copyright: {
        color: '#e0e0e0',
        textAlign: 'center',
        margin: '30px 0 20px',

    },
    linkAddaps: {
        textDecoration: 'none',
        color: '#e0e0e0',

    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(40, 75, 99, 0.8)',
      borderRadius: '5',
    }
}


class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input 
                  type={ this.props.type } 
                  name={ this.props.name } 
                  placeholder={ this.props.placeholder } 
                  value = { this.props.value }
                  onChange = { this.onChange }
                 />
              <label for={ this.props.name } ></label>
           </div>
  }

}


class PasswordSent extends React.Component {
  render() {
    return <div> We are glad to have view back to Addaps </div>
  }
}

// Modal
class Modal extends React.Component {
    
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        
        this.api = mkApi({
            getToken: Ru.K(props.config.token)
        })
        
        this.state = {
            password: '',
            retypePassword: ''
        }
        
        console.log(this.state)
    }
    
    handleInput(event) {
        this.setState({value: event.target.value});
    }


    handleSubmit(e) {
        e.preventDefault();
        
        if ( this.state.password === this.state.newPassword) {
            let np = {
                newPassword: this.state.password
            }
            
            api
            .put('user/password', np)
            .then( data => {
                alert('Check your email for confirmation')
            })
        }
        
        alert('Password don\'t match')
        
        return false;
     }
      
    
  render() {
    //   {this.state.isVisible ? 
    //       
    //   :   <PasswordSent />}
      
    return (
        <div className={ styles.modal }>
          <div >
            <Input 
                onChange = { this.handleInput }
                value = { this.state.password }
                type='password' 
                name='password' 
                placeholder='password' 
            />
            <Input 
                onChange = { this.handleInput }
                value = { this.state.retypePassword }
                type='password' 
                name='retypePassword' 
                placeholder='retypePassword' 
            />
            <div onClick = { this.handleSubmit }> SEND </div>
          </div>
      </div>
    )
  }
}



class ResetPassword extends React.Component {
    
    constructor(props){
        super(props)
    }
    
    render() {

        let {
          firstName,
          lastName,
          avatar,
          token

        } = this.props
        
        let fullName = `${firstName} ${lastName}`;

        return(
            <div style={ styles.container } >
                <div style={styles.title}>
                    RESET PASSWORD  --{ fullName }
                </div>
                <Modal config = { this.props } /> 
                <div style= { styles.mainFooter }>
                    <div style= { styles.copyright }>
                        <p>
                            Copyright © 2017 <a  style={ styles.linkAddaps } href="http://www.addaps.com">Addap's</a><br />
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = ResetPassword
