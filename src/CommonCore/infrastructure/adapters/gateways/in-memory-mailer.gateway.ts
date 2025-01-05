import {
  Email,
  IMailerGateway,
} from 'src/CommonCore/application/ports/mailer.gateway';

export class InMemoryMailerGateway implements IMailerGateway {
  constructor(public emails: Email[] = []) {}

  async send(email: Email): Promise<void> {
    this.emails.push(email);
  }

  async sendTemplate(template: string, data: any): Promise<void> {
    console.log('sendTemplate', template, data);
    this.emails.push({
      to: data.to,
      subject: data.subject,
      body: 'Template',
    });
  }
}
