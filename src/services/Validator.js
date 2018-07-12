import { num2en, isValidIranianNationalCode, isValidIranianMobile } from './../mixins/Helper';

export default class Validator
{
    constructor(data)
    {
        this.data = data;
    }

    validate(callback)
    {
        let roles = this.data;

        let result = [];

        for (let index = 0; index < roles.length; index++) {
            
            // Identifiers
            let field = roles[index]['field'];
            let value = roles[index]['value'];
            let text = roles[index]['text'];
            let message = '';
            
            // Default roles
            let required      = roles[index]['required'];
            let numeric       = roles[index]['numeric'];
            let mobile        = roles[index]['mobile'];
            let nationalCode  = roles[index]['nationalCode'];
            
            // Checking roles
            if (mobile !== undefined && mobile === true)
            {
                if (! isValidIranianMobile(value))
                {
                    message = 'شماره تماس وارد شده صحیح نمی باشد';
                }
            }

            if (nationalCode !== undefined && nationalCode === true)
            {                
                if (! isValidIranianNationalCode(value))
                {
                        message = 'شماره ملی وارد شده صحیح نمی باشد';
                }
            }

            if (numeric !== undefined && numeric === true)
            {
                if (isNaN(value))
                {
                    message = 'فیلد' + ` ${text} ` + 'نمی تواند مقدار غیر عددی داشته باشد';
                }
            }

            if (required !== undefined && required === true)
            {
                if (value === null || value === undefined || value === "" || value === NaN || value === 0)
                {
                    message = 'فیلد' + ` ${text} ` + 'نمی تواند بدون مقدار باشد';
                }
            }

            result.push({
                [field]: {
                        value: value,
                        error: message
                }
            });

        }

        if (typeof callback === "function") {
            callback(result);
        }
    }
}