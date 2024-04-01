import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}:any) =>{
    try {

      const hashedToken = await bcryptjs.hash(userId.toString(),10)

      if(emailType == 'VERIFY'){
        await User.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 36_00_000
        })
      }else if(emailType == 'RESET'){
        await User.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 36_00_000
        })
      }


      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: 'c3bb40c5e6e987',
          pass: '126c950234f5f0'
        }
      });

          const mailOptions = {
            from: 'debrajdey9696@gmail.com', 
            to: email, 
            subject: emailType == "VERIFY" ? "Verify your email": "Reset your password",
            html: `<h1>Welcome to Next Auth App!</h1>
            <p>Please ${emailType == "VERIFY" ? "verify your email" : "reset your password"} by clicking <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
              or copy-pasting the below link in your browser:</p>
            <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
            
            `, 
          }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}