 import {ErrorMessage} from './error'
    const base_url = 'http://www.quicksms1.com/api/sendsms.php?';
    const end_url = '&report=1&convert=1&route=1';


    export const _parseUrl = (sender,message,recipient, that) => {
        let url = '';
        if(typeof recipient !== 'object'){
            url = base_url+'username='+that.username+'&password='+that.password+'&sender='+sender+"&message="+message+"&recipient="+recipient+end_url;
        }
        else{
            url = base_url+'username='+that.username+'&password='+that.password+'&sender='+sender+"&message="+message+"&recipient="+recipient.join(',')+end_url;
        }
        return url;
    };

    export const _checkCredentials = (that) => new Promise((resolve, reject) => {
            if(!that.username && !that.password){
                return resolve();
            }
            reject(ErrorMessage.USERNAME_OR_PASSWORD_NOT_SET);
        });