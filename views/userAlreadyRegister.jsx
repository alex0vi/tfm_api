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
        backgroundColor: '#ebeeff',
        backgroundSize: 'cover',
        justifyContent: 'center',
    },
    primary: {
        color: '#3F51B5',
        fontSize: '40px',
        marginLeft: '30px',
        marginRight: '30px',
        textAlign: 'center',
        marginTop: '100px',
    },
    secondary: {
        color: '#696f6f',
        maxWidth: '900px',
        fontSize: '20px',
        fontWeight: 'lighter',
        marginTop: '25px',
        textAlign: 'center'

    },
    last: {
        color: '#696f6f' ,
        margin: '30px',
        fontSize: '18px',
        textAlign: 'center'
    },
    username: {
        fontWeight: 'bold',
        color: '#fff'
    },
    contactUs: {
        color: '#696f6f',
        textDecoration: 'none',
        fontWeight: 'bold'
    },
    mainFooter: {
        position: 'absolute',
        right: '0',
        bottom: '0',
        left: '0',
    },
    copyright: {
        color: '#696f6f',
        textAlign: 'center',
        margin: '30px 0 20px',

    },

    linkNationPay: {
        textDecoration: 'none',
        color: '#696f6f',

    },

    linkBody: {
        textDecoration: 'none'

    }
}

class UserAlreadyRegister extends React.Component {
  render() {

    return(
        <div style={ styles.container } >
            <div style={ styles.text }>
                <div style={ styles.primary }>
                    This email is already register in Nation Pay!
                </div>
                <div style={ styles.secondary }>
                <br/>Go to the crowdsale <a style={ styles.contactUs } href="https://ico.nationpay.io/#/register">here</a>
                <br/>Or get your account back <a style={ styles.contactUs } href="https://nationpay.io">here</a>
                </div>
                <div style= { styles.last }>
                    Thank you for being part of Nation Pay
                </div>
            </div>

            <div style= { styles.mainFooter }>
                <div style= { styles.copyright }>
                    <p>
                        Copyright © 2017 <a  style={ styles.linkNationPay } href="https://nationpay.io">Nation Pay</a><br />
                    </p>
                </div>
            </div>
        </div>
    )
  }
}

module.exports = UserAlreadyRegister;
