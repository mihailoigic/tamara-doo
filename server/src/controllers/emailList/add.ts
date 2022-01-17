import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {EmailList} from "../../typeorm/entities/EmailList";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const email = makeNewEmail(req);

    try {
        const emailExist = await getManager().findOne(EmailList, { email: email.email });
        if(!emailExist){
            const emailSaved = await getManager().save(EmailList, email);
            res.customSuccess(200, 'email added.', { code: 0, id: emailSaved.id});
        } else{
            const customError = new CustomError(400, 'Raw', `Email already exists!`, null);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't add email to email list.`, null, err);
        return next(customError);
    }
};

const makeNewEmail = (req: Request): EmailList =>{
    const emailObj = new EmailList();
    const { email } = req.body;

    emailObj.email = email;

    return emailObj;
}