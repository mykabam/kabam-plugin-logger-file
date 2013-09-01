var winston = require('winston');

winston.loggers.add('http_access',{
file: {
      filename: process.cwd()+'/logs/http_access.log'
    }
});

winston.loggers.add('newUsers',{
file: {
      filename: process.cwd()+'/logs/newUsers.log'
    }
});

winston.loggers.add('notifies',{
file: {
      filename: process.cwd()+'/logs/notifies.log'
    }
});

winston.loggers.add('errors',{
file: {
      filename: process.cwd()+'/logs/errors.log'
    }
});


var httpLog = winston.loggers.get('http_access'),
  newUserLog = winston.loggers.get('newUsers'),
  notifyLog = winston.loggers.get('notifies'),
  errorLog = winston.loggers.get('errors');

exports.name = 'kabamPluginLoggerFile';

exports.model = {
  'httpLog':function(kabam){

  var httpLogSchema = new kabam.mongoose.Schema({
    "timestamp": {type: Date, default: new Date()},
    "duration": {type: Number, min: 1},
    "statusCode":{type: Number, min: 1, max: 1000},
    "method": {type: String, match: /GET|POST|PUT|DELETE|OPTIONS/i},
    "ip": String,
    "uri": {type: String, match: /\/.*/},
    "username": {type: String, default: null},
    "email":  {type: String, default: null}
  });

  httpLogSchema.index({
    timestamp: 1,
    ip: 1,
    uri: 1,
    username: 1
  });

  return kabam.mongoConnection.model('httpLog', httpLogSchema);
  },
/*
  //todo - implement
  'errors':function(kabam){

  }
*/
};

//the middleware for logging
exports.middleware = function(kabam){
  return function(request,response,next){
    response.on('finish', function () {
      request.model.httpLog.create({
        'startTime': request._startTime,
        'duration': (new Date - request._startTime),
        'statusCode': response.statusCode,
        'method': request.method,
        'ip': request.ip,
        'uri': request.originalUrl,
        'username': (request.user ? request.user.username : null),
        'email': (request.user ? request.user.email : null)
      },function(err, dataSaved){
        if(err) throw err;
        //console.log(dataSaved);
      });
    });

    next();
  };
};

exports.listeners = {
  'http' : httpLog.info,
  'error': errorLog.error, //logging errors
//logging new users
  'users:signUp': newUserLog.info,
  'users:signUpByEmailOnly': newUserLog.info,
  'users:completeProfile': newUserLog.info,
  'users:findOneByApiKeyAndVerify': newUserLog.info,
//logging roles managment - todo - create proper security logging for it
  'users:revokeRole': function(){},
  'users:grantRole': function(){},
//notifications
  'notify:email': notifyLog.info,
  'notify:sio': notifyLog.info
};
