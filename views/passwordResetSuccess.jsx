const React = require('react');

let styles = {
    container: {
        display: 'flex',
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        fontFamily: "Avenir, serif",
        right: 0,
        backgroundImage: 'url("https://www.addaps.com/img/background.png")',
        backgroundColor: '#fff',
        backgroundSize: 'cover',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,.5)'
    },
    primary: {
        color: '#FF6C6F',
        fontSize: '40px',
        marginLeft: '30px',
        marginRight: '30px',
        textAlign: 'center',
        marginTop: '100px',
    },
    secondary: {
        color: '#e0e0e0',
        maxWidth: '900px',
        fontSize: '20px',
        fontWeight: 'lighter',
        marginTop: '50px',
        marginLeft: '30px',
        marginRight: '30px',

    },
    last: {
        color: '#e0e0e0' ,
        margin: '30px',
        fontSize: '18px',
        textAlign: 'center'
    },
    username: {
        fontWeight: 'bold',
        color: '#fff'
    },
    contactUs: {
        color: '#e0e0e0',
        fontWeight: 'lighter'
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

    }
}

class PasswordResetSuccess extends React.Component {
  render() {


      let {
          firstName,
          lastName,
          email

      } = this.props || {};

      let fullName = `${firstName} ${lastName}`;

    return(
        <div style={ styles.container } >
            <div style={ styles.text }>
                <div style={ styles.primary }>
                    Your email has been confirmed!
                </div>
                <div style= { styles.secondary }>
                    <span style={ styles.username }>{'Hi'} { fullName }</span>, {`your email has been confirmed, enjoy the app!`}
                    <br/>If you have any questions, please contact us: <a style={ styles.contactUs } href="mailto:contact@addaps.com">contact@addaps.com</a>
                </div>
                <div style= { styles.last }>
                    Thank you for joining us!
                </div>
            </div>

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

module.exports = PasswordResetSuccess;
