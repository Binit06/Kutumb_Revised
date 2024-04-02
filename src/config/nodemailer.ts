import nodemailer from "nodemailer"

const pass = process.env.EMAIL_PASS

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass,
        
    }
})

export const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
}