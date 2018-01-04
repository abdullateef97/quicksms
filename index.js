let request = require('request');
let fs = require('fs');

let quickSms = ()=>{
    this.username;
    this.password;
    this.setCredentials = setCredentials;
    this.sendSms = sendSms;
    this.sendBulk = sendBulk;
    this.balance = balance;
    this.deliveryReport = deliveryReport
}


//cred = {'username':'your username','password' : 'your password'}
let setCredentials = (username,password)=>{
this.username = username;
this.password = password;
}

let base_url = 'http://www.quicksms1.com/api/sendsms.php?';
let end_url = '&report=1&convert=1&route=1';

let genUrl = (sender,message,recipient) => {
    let url = base_url+'username='+this.username+'&password='+this.password+'&sender='+sender+"&message="+message+"&recipient="+recipient.join(',')+end_url;
    return url;
}


let sendSms = (sender,message,recipient,cb) => {
    if(!this.username || !this.password){
        console.log('username or password is incorrect');
        cb(err);
        return;
    }
    let url = genUrl(sender,message,recipient);
    request(url, (err,response,body) => {
        if(err) cb(err);
        cb(response);
    })
}

//options = {'sender':'sender','message':'your text message','recipientFile':'./recipientFile'}

let sendBulk = (sender,message,recipientFile,cb) => {
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
        let url = genUrl(sender,message,phoneNumbersArray);
        request(url, (err,response,body) => {
            if(err) cb(err);
            cb(response);
        })

    })
}

let balance = (cb)=>{
    let url = base_url+"username="+this.username+"&password="+this.password+"&balance=1";
    request(url, (err,response,body) => {
        if(err) cb(err);
        cb(response);
    })
}

let deliveryReport = (msgId, cb) => {
    let url = "http://www.quicksms1.com/api/getdelivery.php?username="+this.username+"&password="+this.password+"&msgid="+msgId;
    request(url, (err, response,body) => {
        if(err) cb(err);
        cb(response);
    })
}


module.exports =  quickSms;






