import { EventEmitter } from "events";
import { get, set } from "../../../database/redis/redis.service.js";
import { sendEmail } from "./sendEmail.js";
import bcrypt, { compare } from 'bcrypt'
import { findByIdAndUpdate } from "../../../database/database.service.js";
import { userModel } from "../../../database/index.js";
import { BadRequest } from "../reseponce/Error.response.js";


export let event = new EventEmitter()

event.on('sendEmail',async (data)=>{

    let {email , userID , name} = data

 let code = Math.floor(100000 + Math.random() * 900000)
    set({
    key: `verificationCode::${userID}` , 
    value: bcrypt.hashSync(code.toString() , 10) , 
    ttl: 10 * 60
})
   await sendEmail({
  to: email,
  subject: "Verify Your Account 🔐",
  html: `
  <div style="background:#f4f6f8;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
    <table align="center" width="100%" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,0.1);">
      
      <tr>
        <td style="background:#4CAF50;color:white;padding:20px;text-align:center;font-size:24px;font-weight:bold;">
          Welcome To Our Platform 🚀
        </td>
      </tr>

      <tr>
        <td style="padding:30px;text-align:center;color:#333;">
          <h2 style="margin-bottom:10px;">Hello ${name} 👋</h2>
          <p style="font-size:16px;color:#555;">
            We're excited to have you join us.  
            To complete your registration please verify your account using the code below.
          </p>

          <div style="
            margin:30px auto;
            font-size:32px;
            letter-spacing:6px;
            font-weight:bold;
            color:#4CAF50;
            background:#f1f1f1;
            padding:15px 25px;
            display:inline-block;
            border-radius:8px;
          ">
            ${code}
          </div>

          <p style="color:#666;font-size:14px;margin-top:20px;">
            This verification code will expire soon.  
            Please do not share it with anyone.
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:20px;text-align:center;background:#fafafa;border-top:1px solid #eee;">
          <p style="font-size:13px;color:#999;margin:0;">
            If you did not create this account, you can safely ignore this email.
          </p>
        </td>
      </tr>

    </table>

    <p style="text-align:center;color:#aaa;font-size:12px;margin-top:20px;">
      © ${new Date().getFullYear()} Sara7a App. All rights reserved.
    </p>
  </div>
  `
})
})


event.on('varifyemail',async (data)=>{
    let {code ,email , user ,userID ,  host} = data
    console.log(data)

    let redisCode = await get(`verificationCode::${userID}`)
    
    let isMatch = await compare(code.toString(), redisCode)
    
if(isMatch){
          let userData = await findByIdAndUpdate({
                model: userModel ,
                id: userID ,
                update: {isvarify: true}
                
            })
await sendEmail({
        to: email,
        subject: "Account Verified ✅",
        html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2 style="color: #4CAF50;">Hello ${user.name} 👋</h2>
                <p>Your account has been successfully verified.</p>
                <p>You can now login and start using the platform.</p>
    
                <a href="http://${host}/login"
                   style="
                   display:inline-block;
                   margin-top:20px;
                   padding:10px 20px;
                   background:#4CAF50;
                   color:white;
                   text-decoration:none;
                   border-radius:5px;
                   ">
                   Login To Your Account
                </a>
    
                <p style="margin-top:30px;color:gray;font-size:12px;">
                    If you did not create this account, please ignore this email.
                </p>
            </div>
        `
    })
    return userData
}else{
    BadRequest({message: "code is invalid"})
   }    
})



event.on('forgetPassword', async (data)=>{
  let {email , user} = data
  let code = Math.floor(100000 + Math.random() * 900000)
 
   await set({
      key : `forgetPasswordCode::${user._id}` ,
      value: bcrypt.hashSync(code.toString() , 10) ,
      ttl: 10 * 60
    })

    await sendEmail({
  to: email,
  subject: "Reset Your Password 🔐",
  html: `
<div style="background:#0f172a;padding:50px 15px;font-family:Arial,Helvetica,sans-serif;">

<table align="center" width="100%" cellpadding="0" cellspacing="0"
style="max-width:600px;background:#111827;border-radius:14px;overflow:hidden;
box-shadow:0 20px 50px rgba(0,0,0,0.6);">

<tr>
<td style="padding:30px;text-align:center;
background:linear-gradient(135deg,#1e293b,#020617);">

<h1 style="color:#38bdf8;margin:0;font-size:28px;">
Password Reset 🔐
</h1>

<p style="color:#9ca3af;font-size:14px;margin-top:10px;">
Security Verification Required
</p>

</td>
</tr>

<tr>
<td style="padding:40px;text-align:center;color:#e5e7eb;">

<h2 style="color:white;margin-bottom:10px;">
Hello ${user.name} 👋
</h2>

<p style="color:#9ca3af;font-size:15px;line-height:1.6;">
We received a request to reset your password.
Use the verification code below to continue.
</p>

<div style="
margin:35px auto;
font-size:34px;
letter-spacing:10px;
font-weight:bold;
color:#38bdf8;
background:#020617;
padding:18px 30px;
display:inline-block;
border-radius:10px;
border:1px solid #1f2937;
box-shadow:0 0 25px rgba(56,189,248,0.3);
">
${code}
</div>

<p style="color:#9ca3af;font-size:14px;margin-top:15px;">
This code will expire in <strong>10 minutes</strong>.
</p>

<p style="color:#6b7280;font-size:13px;margin-top:25px;">
If you didn’t request a password reset, you can safely ignore this email.
</p>

</td>
</tr>

<tr>
<td style="background:#020617;padding:20px;text-align:center;
border-top:1px solid #1f2937;">

<p style="font-size:12px;color:#6b7280;margin:0;">
Security Notification
</p>

<p style="font-size:12px;color:#4b5563;margin-top:5px;">
© ${new Date().getFullYear()} Your Platform
</p>

</td>
</tr>

</table>

</div>
`
})

})



event.on('resetPassword' , async (data)=>{
  let {code , password , userID , email , user , host} = data
  let redisCode = await get(`forgetPasswordCode::${userID}`)

  if(!redisCode){
  throw new BadRequest({message: "code expired or not found"})
}
  
 
  let isMatch = await compare(code.toString() , redisCode)
  if(isMatch){
    let updatedUser = await findByIdAndUpdate({model: userModel , 
      filter: {_id: userID} ,
      update: {password}
    })
  await sendEmail({
  to: email,
  subject: "Password Reset Successfully ✅",
  html: `<div style="background:#0f172a;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">

<table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111827;border-radius:12px;overflow:hidden;">

<tr>
<td align="center" style="padding:30px;background:#020617;">
<h1 style="color:#38bdf8;margin:0;font-size:26px;">
Password Updated 🔐
</h1>
</td>
</tr>

<tr>
<td align="center" style="padding:40px;color:#e5e7eb;">

<table align="center" cellpadding="0" cellspacing="0">
<tr>
<td align="center" width="70" height="70" style="background:#22c55e;border-radius:50%;font-size:32px;color:white;">
✓
</td>
</tr>
</table>

<h2 style="margin-top:25px;color:white;">
Hello ${user.name} 👋
</h2>

<p style="color:#9ca3af;font-size:15px;line-height:1.6;">
Your password has been successfully changed.
</p>

<p style="color:#9ca3af;font-size:15px;">
If this action was not performed by you, secure your account immediately.
</p>

<table align="center" cellpadding="0" cellspacing="0" style="margin-top:25px;">
<tr>
<td align="center" bgcolor="#38bdf8" style="padding:14px 28px;border-radius:8px;">
<a href="http://${host}/login" 
style="color:#020617;text-decoration:none;font-weight:bold;font-size:15px;">
Login To Your Account
</a>
</td>
</tr>
</table>

</td>
</tr>

<tr>
<td align="center" style="padding:20px;background:#020617;color:#6b7280;font-size:12px;">
Security notification • © ${new Date().getFullYear()}
</td>
</tr>

</table>

</div>
  `
}) 
   return updatedUser
  }else{
    BadRequest({message: "code is invalid"})
  }
})