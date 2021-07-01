import IMailTemplateProvider from '@shared/container/MailTemplateProvider/models/IMailTemplateProvider';
import handlebars from 'handlebars';
import IParserMailTemplateDTO from '../dtos/IParserMailTemplateDTO';
import fs from 'fs';

export default class HandlerbarTemplateProvider
    implements IMailTemplateProvider
{
    public async parser({
        file,
        variables,
    }: IParserMailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parserTemplate = handlebars.compile(templateFileContent);

        return parserTemplate(variables);
    }
}
