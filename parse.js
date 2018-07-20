

export default class Parse {
    constructor(){
        this.base_url = 'http://www.quicksms1.com/api/sendsms.php?';
        this.end_url = '&report=1&convert=1&route=1';
    }

    _parseUrl(sender,message,recipient, that){
        let url = '';
        if(typeof recipient !== 'object'){
            url = this.base_url+'username='+that.username+'&password='+that.password+'&sender='+sender+"&message="+message+"&recipient="+recipient+this.end_url;
        }
        else{
            url = this.base_url+'username='+that.username+'&password='+that.password+'&sender='+sender+"&message="+message+"&recipient="+recipient.join(',')+this.end_url;
        }
        return url;
    }

    _checkCredentials(that){
        return new Promise((resolve, reject) => {
            if(!that.username && !that.password){
                return resolve();
            }
            console.log('Username or Password is nor correct');
            reject();
        })
    }


}