export const I_MAILER_GATEWAY = Symbol('I_MAILER_GATEWAY');

export type Email = {
  to: string;
  subject: string;
  body: string;
};

export interface IMailerGateway {
  send(email: Email): Promise<void>;
  sendTemplate(template: string, data: any): Promise<void>;
}
