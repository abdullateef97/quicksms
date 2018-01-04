# Quick Sms

 A Node.js library for sending sms and bulk sms using [quicksms api](http://quicksms1.com/page/3)
r

# Get Started
```
~$ npm install quicksms
```

# Usage
After Installing import quicksms
```
var quicksms  = require('quicksms');
```
## Configure
Create your username and password from [ quicksms official website ](http://quicksms1.com)

For error and response code, do check the [official quicksms docs](http://quicksms1.com/page/3)

```
quicksms.setCredentials({username,password});
```

## Parameters
    sender :- the Sender of the message,
    recipientFile :- the file path containing the Phone Numbers (for bulk sms, numbers should be seperated by ",")
    message :- the content of the message to be sent
    N.B :- Ignore the '+' sign infront of phone numbers, instead of '+23456868' use '23456868'
    
## Send SMS
```
quicksms.sendSms(options,cb);
N.B options = {'sender':'sender','message':'your text message','recipient':'recipient'}
```
## Send Bulk Sms
```
quicksms.sendBulk(options,cb);
N.B options = {'sender':'sender','message':'your text message','recipientFile':'./recipientFile'}
```

## Check your quicksms balance

```
quicksms.balance(cb);
```

## Get the delivery Report for a message

```
quicksms.deliveryReport(msgId,cb);
```

## Contributing
If you would like to contribute, fork the repo, make your changes and create a pull request

## License
This Library was released under MIT License

## Reference
[Quicksms Api Documentation](http://quicksms1.com/page/3)

## Contributors
[Abdullateef AdeniranYusuf](https://github.com/abdullateef97)
