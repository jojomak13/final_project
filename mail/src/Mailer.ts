import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

class Mailer {
  private _instanse?: Mail;

  connect(config: { user: string; pass: string }): Mail {
    if (this._instanse) {
      return this._instanse;
    }

    this._instanse = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: config,
    });

    return this._instanse;
  }

  public sendTo(mail: string, data: { body: string; subject: string }) {
    this._instanse?.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: mail, // list of receivers
      subject: data.subject,
      text: data.body,
    });
  }
}

export const mail = new Mailer();
