const React = require('react');
// https://babeljs.io/repl/
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
        backgroundColor: '#373737',
        backgroundSize: 'cover',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 100px #212121'
    },
    primary: {
        color: '#009688',
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
        marginTop: '25px',
        textAlign: 'center'

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

    linkRealSafe: {
        textDecoration: 'none',
        color: '#e0e0e0',

    },

    linkBody: {
        textDecoration: 'none'

    }
}

class UnexistentTokenError extends React.Component {
  render() {

    return(
        <div style={ styles.container } >
            <div style={ styles.text }>
                <div style={ styles.primary }>
                    INVALID RESET PASSWORD TOKEN!
                </div>
                <div style={ styles.secondary }>
                    Join the crowdsale <a style={ styles.contactUs } href="https://ico.realsafe.co/#/register">here</a> Or go back to <a style={ styles.contactUs } href="https://realsafe.co">realsafe.co</a>
                </div>
                <div style= { styles.last }>
                    Thank you for being part of RealSafe
                </div>
            </div>

            <div style= { styles.mainFooter }>
                <div style= { styles.copyright }>
                    <p>
                        Copyright © 2017 <a  style={ styles.linkRealSafe } href="https://realsafe.co">RealSafe</a><br />
                    </p>
                </div>
            </div>
        </div>
    )
  }
}

module.exports = UnexistentTokenError;
