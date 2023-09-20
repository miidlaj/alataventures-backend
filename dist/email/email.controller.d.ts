import { EmailService } from './email.service';
import { EmailDto } from './email.dto';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(response: any, emailData: EmailDto): Promise<any>;
}
