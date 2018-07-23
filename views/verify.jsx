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


class EmailConfirmed extends React.Component {
  render() {
   let {
     firstName,
     email
   } = this.props

   console.log('this.props::: ', firstName)

  // let url = `https://ico.nationpay.io/#/login?name=${encodeURIComponent(firstName)}&email=${encodeURIComponent(email)}`
  let url = `http://localhost:3051/#/login?name=${encodeURIComponent(firstName)}&email=${encodeURIComponent(email)}`
  let redirect = `(function(){window.location = "${url}"})()`

  let log = '(function(){console.log("Done Daniel")})()'

   return (
     <div style={ styles.container } >
         <div style={ styles.text }>
             <div style={ styles.primary }>
                 Congratulations { firstName }, your email has been confirmed!
             </div>
             <div style={ styles.secondary }>
                 If in few seconds you hasn't been redirected to our <a style={ styles.contactUs } href={url}>ICO website</a>,
                 Please click <a style={ styles.contactUs } href={url}>here</a>
             </div>
         </div>

         <div style= { styles.mainFooter }>
             <div style= { styles.copyright }>
                 <p>
                     Copyright © 2017 <a  style={ styles.linkNationPay } href="https://nationpay.io">Nation Pay</a><br />
                 </p>
             </div>
         </div>
         <script dangerouslySetInnerHTML={{__html: redirect}} />
     </div>
   )
 }
}

module.exports = EmailConfirmed;
