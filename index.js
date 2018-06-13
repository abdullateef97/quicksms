const fs = require('fs');
const request = require('request');

class quickSms{
    constructor(){
        this.username;
        this.password;
        this.base_url = 'http://www.quicksms1.com/api/sendsms.php?';
        this.end_url = '&report=1&convert=1&route=1';
    }

    setCredentials(username, password){
        this.username = username;
        this.password = password;
    }

    genUrl(sender,message,recipient){
    let url = '';
    if(typeof recipient !== 'object'){
        url = this.base_url+'username='+this.username+'&password='+this.password+'&sender='+sender+"&message="+message+"&recipient="+recipient+this.end_url;
    }
    else{
        url = this.base_url+'username='+this.username+'&password='+this.password+'&sender='+sender+"&message="+message+"&recipient="+recipient.join(',')+this.end_url;
    }
    return url;
    }


    sendSms(sender,message,recipient,cb){
        if(!this.username && !this.password){
            console.log('username or password is incorrect');
            cb(err);
            return;
        }
        let url = this.genUrl(sender,message,recipient);
       
        request(url, (err,response,body) => {
            if(err) cb(err);
            cb(body);
        })
    }

    sendBulk(sender,message,recipientFile,cb){
        if(!this.username && !this.password){
            console.log('username or password is incorrect');
            cb(err);
            return;
        }
        
        fs.readFile(recipientFile,(err,data) => {
            if(err){
                cb(err);
                return;
            }
            phoneNumbersArray = data.split(',');
            let url = this.genUrl(sender,message,phoneNumbersArray);
            request(url, (err,response,body) => {
                if(err) cb(err);
                cb(body);
            })
    
        })
    }

    getDeliveryReport(msgId,cb){
        if(!this.username && !this.password){
            conosle.log('jjjj')
        let url = "http://www.quicksms1.com/api/getdelivery.php?username="+this.username+"&password="+this.password+"&msgid="+msgId;
        console.log(url);
        request(url, (err, response,body) => {
            if(err) cb(err);
            cb(body);
        });
    }
    }

    getBalance(cb){
        if(!this.username && !this.password){
        let url = this.base_url+"username="+this.username+"&password="+this.password+"&balance=1";
        request(url, (err,response,body) => {
            if(err) cb(err);
           
            cb(body);
        });
    }
    }


}


module.exports = new quickSms