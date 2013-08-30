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

exports.listeners = {
  'http' : httpLog.info, //logging http access
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
