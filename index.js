const fs = require('fs');
const request = require('request');
const parse = require('./parse')

class quickSms{
    constructor(){
        this.username;
        this.password;
    }

    setCredentials(username, password){
        this.username = username;
        this.password = password;
    }

    sendSms(sender,message,recipient){
        return new Promise((resolve, reject) => {
            parse._checkCredentials(this).then(() => {
                let url = parse._parseUrl(sender, message, recipient, this);
                request(url, (err,response,body) => {
                    if(err) cb(err);
                    cb(body);
                })
            });  
        });
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