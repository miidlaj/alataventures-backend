import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'alataventures.tech@gmail.com',
        pass: 'laljuzxustrvvghb',
      },
    });
  }

  async sendEmail(
    subject: string,
    name: string,
    emailAddress: string,
    phone: string,
    message: string,
  ) {
    const mailOptions = {
      from: 'alataventures.tech@gmail.com',
      to: emailAddress,
      subject,
      text: `
        Name: ${name}
        Email Address: ${emailAddress}
        Subject: ${subject}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Cannot send email at the moment!');
    }
  }
}
