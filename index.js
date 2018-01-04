let request = require('request');
let fs = require('fs');

export let quickSms = ()=>{
    this.username;
    this.password;
}


//cred = {'username':'your username','password' : 'your password'}
quickSms.prototype.setCredentials = (username,password)=>{
this.username = username;
this.password = password;
}

let base_url = 'http://www.quicksms1.com/api/sendsms.php?';
let end_url = '&report=1&convert=1&route=1';

quickSms.prototype.genUrl = (sender,message,recipient) => {
    let url = base_url+'username='+this.username+'&password='+this.password+'&sender='+sender+"&message="+message+"&recipient="+recipient.join(',')+end_url;
    return url;
}


quickSms.prototype.sendSms = (sender,message,recipient,cb) => {
    if(!this.username || !this.password){
        console.log('username or password is incorrect');
        cb(err);
        return;
    }
    let url = this.genUrl(sender,message,recipient);
    request(url, (err,response,body) => {
        if(err) cb(err);
        cb(response);
    })
}

//options = {'sender':'sender','message':'your text message','recipientFile':'./recipientFile'}

quickSms.prototype.sendBulk = (sender,message,recipientFile,cb) => {
    if(!this.username || !this.password){
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
            cb(response);
        })

    })
}

quickSms.prototype.balance = (cb)=>{
    let url = base_url+"username="+this.username+"&password="+this.password+"&balance=1";
    request(url, (err,response,body) => {
        if(err) cb(err);
        cb(response);
    })
}

quickSms.deliveryReport = (msgId, cb) => {
    let url = "http://www.quicksms1.com/api/getdelivery.php?username="+this.username+"&password="+this.password+"&msgid="+msgId;
    request(url, (err, response,body) => {
        if(err) cb(err);
        cb(response);
    })
}






