import IParserMailTemplatesDTO from '../../MailTemplateProvider/dtos/IParserMailTemplateDTO';

interface IMailContant {
    name: string;
    email: string;
}

interface ISendMailDTO {
    to: IMailContant;
    from?: IMailContant;
    subject: string;
    templateData: IParserMailTemplatesDTO;
}

export default ISendMailDTO;
