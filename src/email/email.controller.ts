import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Res() response, @Body() emailData: EmailDto) {
    const { subject, name, emailAddress, phone, message } = emailData;
    try {
      await this.emailService.sendEmail(
        subject,
        name,
        emailAddress,
        phone,
        message,
      );
    } catch (err) {
      return response.status(err.status).json(err.response);
    }

    return response.status(HttpStatus.OK).json({
      message: 'Success',
    });
  }
}
