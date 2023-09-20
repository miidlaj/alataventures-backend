export declare class EmailService {
    private readonly transporter;
    constructor();
    sendEmail(subject: string, name: string, emailAddress: string, phone: string, message: string): Promise<void>;
}
