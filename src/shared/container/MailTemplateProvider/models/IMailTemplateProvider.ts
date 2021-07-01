import IParserMailTemplateDTO from '../dtos/IParserMailTemplateDTO';

export default interface IMailTemplateProvider {
    parser(data: IParserMailTemplateDTO): Promise<string>;
}
