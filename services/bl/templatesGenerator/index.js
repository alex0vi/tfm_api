'use strict'

const generateConfirmationEmail = spec => {

  let {
    firstName,
    verifyLink
  } = spec

  return `
    <!DOCTYPE html>
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Verify your email</title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <style type="text/css">
              @import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,300,400,700);

              #outlook a {
                  padding: 0;
              }

              .ReadMsgBody {
                  width: 100%;
              }

              .ExternalClass {
                  width: 100%;
              }

              .ExternalClass * {
                  line-height: 100%;
              }

              body {
                  margin: 0;
                  font-family: 'Open Sans';
                  padding: 0;
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
              }

              table,
              td {
                  border-collapse: collapse;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
              }

              img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                  -ms-interpolation-mode: bicubic;
              }

              p {
                  display: block;
                  margin: 13px 0;
              }

              .social-media-links {
                  padding: 0;
                  list-style: none;
              }

              .social-media-links li {
                  display: inline-block;
                  margin-left: 10px;
              }

              .social-media-links li:first-child {
                  margin-left: 0;
              }

              .social-media-links li i {
                  display: inline-block;
                  width: 40px;
                  height: 40px;
                  font-size: 20px;
                  line-height: 40px;
                  text-align: center;
                  color: #ffffff;
              }

              .social-media-links li a {
                  display: inline-block;
                  border-radius: 50%;
                  background-color: #cccccc;
                  background-color: rgba(0, 0, 0, 0.15);
                  font-weight: normal;
                  color: #777777;
              }

              .social-media-links li a:hover {
                  background-color: #3F51B5;
              }
          </style>
          <!--[if !mso]><!-->
          <style type="text/css">
              @media only screen and (max-width:480px) {
                  @-ms-viewport {
                      width: 320px;
                  }
                  @viewport {
                      width: 320px;
                  }
              }
          </style>
          <!--<![endif]-->
          <!--[if mso]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <style type="text/css">
              @media only screen and (min-width:480px) {
                  .mj-column-per-100,
                  * [aria-labelledby="mj-column-per-100"] {
                      width: 100%!important;
                  }
                  .mj-column-per-80,
                  * [aria-labelledby="mj-column-per-80"] {
                      width: 80%!important;
                  }
                  .mj-column-per-30,
                  * [aria-labelledby="mj-column-per-30"] {
                      width: 30%!important;
                  }
                  .mj-column-per-70,
                  * [aria-labelledby="mj-column-per-70"] {
                      width: 70%!important;
                  }
              }
          </style>
      </head>

      <body style="background: #ebeeff;">
          <div style="background-color:#ebeeff;">
              <div style="margin:0 auto;max-width:600px;background:#fff;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background: linear-gradient(90deg, #5C6BC0, #3F51B5);" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:10px 0px;">
                                  <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                      <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:10px 0px;" align="center">
                                                      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                                                          <tbody>
                                                              <tr>
                                                                  <td>
                                                                      <a style="text-decoration:none;" href="https://nationpay.io/" target="_blank">
                                          <img alt="auth0" title=""  height="auto" src="https://nationpay.io/assets/img/logo.png" style="border:none;height:24px;outline:none;"
                                          />
                                            <span style=" margin-left:10px;color:#00BCD4; font-size:30px; ">Nation</span><span style="color:#fff; font-size:30px;">Pay</span>
                                        </a>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="margin:0 auto;max-width:600px;background:white;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:40px 25px 0px;">
                                  <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                      <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:0px 0px 25px;" align="left">
                                                      <div style="cursor:auto;color:#373737;font-family:'Open Sans';font-size:20px;font-weight:600;line-height:30px;">
                                                          Hello ${firstName},
                                                      </div>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:0px 0px 25px;" align="left">
                                                      <div style="cursor:auto;color:#373737;font-family:'Open Sans';font-size:18px;line-height:30px;">
                                                          You're just one click away from confirming your registration, please take a moment to make sure we’ve got your email address right.
                                                      </div>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="margin:0 auto;max-width:600px;background:white;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:0px 30px;">
                                  <p style="font-size:1px;margin:0 auto;border-top:1px solid #E3E5E7;width:100%;"></p>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="margin:0 auto;max-width:600px;background:white;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                                  <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                      <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                                                      <table cellpadding="0" cellspacing="0" align="center" border="0">
                                                          <tbody>
                                                              <tr>
                                                                  <td style="border-radius:4px;color:white;cursor:auto;" align="center" valign="middle" bgcolor="#3F51B5"><a href="${verifyLink}" style="display:inline-block;text-decoration:none;background:#3F51B5;border-radius:3px;color:white;font-family:'Open Sans'; text-transform: uppercase;font-size:14px;font-weight:600;line-height:35px;padding:10px 25px;margin:0px;"
                                                                          target="_blank">
                                                                    confirm your email address
                                                                  </a></td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="text-align:center">
                  <ul class="social-media-links">
                      <li>
                          <a href="https://www.facebook.com/NationPay/" target="new">
                            <i class="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                          <a href="https://telegram.me/nationpay" target="new">
                            <i class="fa fa-telegram"></i>
                        </a>
                      </li>
                      <li>
                          <a href="https://nationpay.slack.com" target="new">
                            <i class="fa fa-slack"></i>
                        </a>
                      </li>
                  </ul>
              </div>
              <div style="margin:0 auto;max-width:600px; display:flex">
                  <div style="width:50%;margin-top:20px;cursor:auto;color:#757575;font-family:'Open Sans'; text-align:left;font-size:12px;line-height:30px;">
                      Copyright © 2017 <a style="color: #757575 " href="https://nationpay.io" target="_blank">NationPay</a>
                  </div>
                  <div style="width:50%;margin-top:20px;cursor:auto;color:#757575;font-family:'Open Sans'; text-align:right;font-size:12px;line-height:30px;">
                      <a style="color: #757575 " href="https://nationpay.io/api/unsubscribe" target="_blank">unsubscribe</a>
                  </div>
              </div>
          </div>
      </body>
    </html>
  `
}

const generateConfirmationWhenFailSignIn = spec => {

  let {
    firstName,
    verifyLink
  } = spec

  return `
    <!DOCTYPE html>
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Verify your email</title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <style type="text/css">
              @import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,300,400,700);

              #outlook a {
                  padding: 0;
              }

              .ReadMsgBody {
                  width: 100%;
              }

              .ExternalClass {
                  width: 100%;
              }

              .ExternalClass * {
                  line-height: 100%;
              }

              body {
                  margin: 0;
                  font-family: 'Open Sans';
                  padding: 0;
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
              }

              table,
              td {
                  border-collapse: collapse;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
              }

              img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                  -ms-interpolation-mode: bicubic;
              }

              p {
                  display: block;
                  margin: 13px 0;
              }

              .social-media-links {
                  padding: 0;
                  list-style: none;
              }

              .social-media-links li {
                  display: inline-block;
                  margin-left: 10px;
              }

              .social-media-links li:first-child {
                  margin-left: 0;
              }

              .social-media-links li i {
                  display: inline-block;
                  width: 40px;
                  height: 40px;
                  font-size: 20px;
                  line-height: 40px;
                  text-align: center;
                  color: #ffffff;
              }

              .social-media-links li a {
                  display: inline-block;
                  border-radius: 50%;
                  background-color: #cccccc;
                  background-color: rgba(0, 0, 0, 0.15);
                  font-weight: normal;
                  color: #777777;
              }

              .social-media-links li a:hover {
                  background-color: #3F51B5;
              }
          </style>
          <!--[if !mso]><!-->
          <style type="text/css">
              @media only screen and (max-width:480px) {
                  @-ms-viewport {
                      width: 320px;
                  }
                  @viewport {
                      width: 320px;
                  }
              }
          </style>
          <!--<![endif]-->
          <!--[if mso]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <style type="text/css">
              @media only screen and (min-width:480px) {
                  .mj-column-per-100,
                  * [aria-labelledby="mj-column-per-100"] {
                      width: 100%!important;
                  }
                  .mj-column-per-80,
                  * [aria-labelledby="mj-column-per-80"] {
                      width: 80%!important;
                  }
                  .mj-column-per-30,
                  * [aria-labelledby="mj-column-per-30"] {
                      width: 30%!important;
                  }
                  .mj-column-per-70,
                  * [aria-labelledby="mj-column-per-70"] {
                      width: 70%!important;
                  }
              }
          </style>
      </head>

      <body style="background: #ebeeff;">
          <div style="background-color:#ebeeff;">
              <div style="margin:0 auto;max-width:600px;background:#fff;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background: linear-gradient(90deg, #5C6BC0, #3F51B5);" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:10px 0px;">
                                  <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                      <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:10px 0px;" align="center">
                                                      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                                                          <tbody>
                                                              <tr>
                                                                  <td>
                                                                      <a style="text-decoration:none;" href="https://nationpay.io/" target="_blank">
                                          <img alt="auth0" title=""  height="auto" src="https://nationpay.io/assets/img/logo.png" style="border:none;height:24px;outline:none;"
                                          />
                                            <span style=" margin-left:10px;color:#00BCD4; font-size:30px; ">Nation</span><span style="color:#fff; font-size:30px;">Pay</span>
                                        </a>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="margin:0 auto;max-width:600px;background:white;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:40px 25px 0px;">
                                  <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                      <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:0px 0px 25px;" align="left">
                                                      <div style="cursor:auto;color:#373737;font-family:'Open Sans';font-size:20px;font-weight:600;line-height:30px;">
                                                          Hello ${firstName},
                                                      </div>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:0px 0px 25px;" align="left">
                                                      <div style="cursor:auto;color:#373737;font-family:'Open Sans';font-size:18px;line-height:30px;">
                                                          <p>There has been an sign in attempt for Nation Pay platform using this account.</p>
                                                          <p>
                                                            If this was you, please click the button below to confirm your email.
                                                          </p>
                                                          <p>
                                                            If this was not you, don't worry and just ignore this.
                                                          </p>
                                                      </div>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="margin:0 auto;max-width:600px;background:white;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:0px 30px;">
                                  <p style="font-size:1px;margin:0 auto;border-top:1px solid #E3E5E7;width:100%;"></p>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="margin:0 auto;max-width:600px;background:white;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                                  <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                      <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                                                      <table cellpadding="0" cellspacing="0" align="center" border="0">
                                                          <tbody>
                                                              <tr>
                                                                  <td style="border-radius:4px;color:white;cursor:auto;" align="center" valign="middle" bgcolor="#3F51B5"><a href="${verifyLink}" style="display:inline-block;text-decoration:none;background:#3F51B5;border-radius:3px;color:white;font-family:'Open Sans'; text-transform: uppercase;font-size:14px;font-weight:600;line-height:35px;padding:10px 25px;margin:0px;"
                                                                          target="_blank">
                                                                    confirm your email address
                                                                  </a></td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="text-align:center">
                  <ul class="social-media-links">
                      <li>
                          <a href="https://www.facebook.com/NationPay/" target="new">
                            <i class="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                          <a href="https://telegram.me/nationpay" target="new">
                            <i class="fa fa-telegram"></i>
                        </a>
                      </li>
                      <li>
                          <a href="https://nationpay.slack.com" target="new">
                            <i class="fa fa-slack"></i>
                        </a>
                      </li>
                  </ul>
              </div>
              <div style="margin:0 auto;max-width:600px; display:flex">
                  <div style="width:50%;margin-top:20px;cursor:auto;color:#757575;font-family:'Open Sans'; text-align:left;font-size:12px;line-height:30px;">
                      Copyright © 2017 <a style="color: #757575 " href="https://nationpay.io" target="_blank">NationPay</a>
                  </div>
                  <div style="width:50%;margin-top:20px;cursor:auto;color:#757575;font-family:'Open Sans'; text-align:right;font-size:12px;line-height:30px;">
                      <a style="color: #757575 " href="https://nationpay.io/api/unsubscribe" target="_blank">unsubscribe</a>
                  </div>
              </div>
          </div>
      </body>
    </html>
  `
}

const generateConfirmationWhenFailSignUp = spec => {

  let {
    firstName
  } = spec

  let verifyLink = "https://nationpay.io"

  return `
    <!DOCTYPE html>
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Verify your email</title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <style type="text/css">
              @import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,300,400,700);

              #outlook a {
                  padding: 0;
              }

              .ReadMsgBody {
                  width: 100%;
              }

              .ExternalClass {
                  width: 100%;
              }

              .ExternalClass * {
                  line-height: 100%;
              }

              body {
                  margin: 0;
                  font-family: 'Open Sans';
                  padding: 0;
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
              }

              table,
              td {
                  border-collapse: collapse;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
              }

              img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                  -ms-interpolation-mode: bicubic;
              }

              p {
                  display: block;
                  margin: 13px 0;
              }

              .social-media-links {
                  padding: 0;
                  list-style: none;
              }

              .social-media-links li {
                  display: inline-block;
                  margin-left: 10px;
              }

              .social-media-links li:first-child {
                  margin-left: 0;
              }

              .social-media-links li i {
                  display: inline-block;
                  width: 40px;
                  height: 40px;
                  font-size: 20px;
                  line-height: 40px;
                  text-align: center;
                  color: #ffffff;
              }

              .social-media-links li a {
                  display: inline-block;
                  border-radius: 50%;
                  background-color: #cccccc;
                  background-color: rgba(0, 0, 0, 0.15);
                  font-weight: normal;
                  color: #777777;
              }

              .social-media-links li a:hover {
                  background-color: #3F51B5;
              }
          </style>
          <!--[if !mso]><!-->
          <style type="text/css">
              @media only screen and (max-width:480px) {
                  @-ms-viewport {
                      width: 320px;
                  }
                  @viewport {
                      width: 320px;
                  }
              }
          </style>
          <!--<![endif]-->
          <!--[if mso]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <style type="text/css">
              @media only screen and (min-width:480px) {
                  .mj-column-per-100,
                  * [aria-labelledby="mj-column-per-100"] {
                      width: 100%!important;
                  }
                  .mj-column-per-80,
                  * [aria-labelledby="mj-column-per-80"] {
                      width: 80%!important;
                  }
                  .mj-column-per-30,
                  * [aria-labelledby="mj-column-per-30"] {
                      width: 30%!important;
                  }
                  .mj-column-per-70,
                  * [aria-labelledby="mj-column-per-70"] {
                      width: 70%!important;
                  }
              }
          </style>
      </head>

      <body style="background: #ebeeff;">
          <div style="background-color:#ebeeff;">
              <div style="margin:0 auto;max-width:600px;background:#fff;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background: linear-gradient(90deg, #5C6BC0, #3F51B5);" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:10px 0px;">
                                  <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                      <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:10px 0px;" align="center">
                                                      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                                                          <tbody>
                                                              <tr>
                                                                  <td>
                                                                      <a style="text-decoration:none;" href="https://nationpay.io/" target="_blank">
                                          <img alt="auth0" title=""  height="auto" src="https://nationpay.io/assets/img/logo.png" style="border:none;height:24px;outline:none;"
                                          />
                                            <span style=" margin-left:10px;color:#00BCD4; font-size:30px; ">Nation</span><span style="color:#fff; font-size:30px;">Pay</span>
                                        </a>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="margin:0 auto;max-width:600px;background:white;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:40px 25px 0px;">
                                  <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                      <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:0px 0px 25px;" align="left">
                                                      <div style="cursor:auto;color:#373737;font-family:'Open Sans';font-size:20px;font-weight:600;line-height:30px;">
                                                          Hello ${firstName},
                                                      </div>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:0px 0px 25px;" align="left">
                                                      <div style="cursor:auto;color:#373737;font-family:'Open Sans';font-size:18px;line-height:30px;">
                                                          <p>There has been an sign up attempt for Nation Pay platform using this account</p>
                                                          <p>
                                                            If this was you, please click the button below to login.
                                                          </p>
                                                          <p>
                                                            If this was not you, don't worry and just ignore this. You account is safe.
                                                          </p>
                                                      </div>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="margin:0 auto;max-width:600px;background:white;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:0px 30px;">
                                  <p style="font-size:1px;margin:0 auto;border-top:1px solid #E3E5E7;width:100%;"></p>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="margin:0 auto;max-width:600px;background:white;">
                  <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
                                  <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                      <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                                                      <table cellpadding="0" cellspacing="0" align="center" border="0">
                                                          <tbody>
                                                              <tr>
                                                                  <td style="border-radius:4px;color:white;cursor:auto;" align="center" valign="middle" bgcolor="#3F51B5"><a href="${verifyLink}" style="display:inline-block;text-decoration:none;background:#3F51B5;border-radius:3px;color:white;font-family:'Open Sans'; text-transform: uppercase;font-size:14px;font-weight:600;line-height:35px;padding:10px 25px;margin:0px;"
                                                                          target="_blank">
                                                                    Go to login
                                                                  </a></td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div style="text-align:center">
                  <ul class="social-media-links">
                      <li>
                          <a href="https://www.facebook.com/NationPay/" target="new">
                            <i class="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                          <a href="https://telegram.me/nationpay" target="new">
                            <i class="fa fa-telegram"></i>
                        </a>
                      </li>
                      <li>
                          <a href="https://nationpay.slack.com" target="new">
                            <i class="fa fa-slack"></i>
                        </a>
                      </li>
                  </ul>
              </div>
              <div style="margin:0 auto;max-width:600px; display:flex">
                  <div style="width:50%;margin-top:20px;cursor:auto;color:#757575;font-family:'Open Sans'; text-align:left;font-size:12px;line-height:30px;">
                      Copyright © 2017 <a style="color: #757575 " href="https://nationpay.io" target="_blank">NationPay</a>
                  </div>
                  <div style="width:50%;margin-top:20px;cursor:auto;color:#757575;font-family:'Open Sans'; text-align:right;font-size:12px;line-height:30px;">
                      <a style="color: #757575 " href="https://nationpay.io/api/unsubscribe" target="_blank">unsubscribe</a>
                  </div>
              </div>
          </div>
      </body>
    </html>
  `
}

module.exports = {
  generateConfirmationEmail,
  generateConfirmationWhenFailSignIn
}
