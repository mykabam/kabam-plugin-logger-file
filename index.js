var winston = require('winston');

winston.loggers.add('http_access',{
file: {
      filename: process.cwd()+'/logs/http_access.log'
    }
});

winston.loggers.add('users',{
file: {
      filename: process.cwd()+'/logs/users.log'
    }
});

winston.loggers.add('notify',{
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
  userLog = winston.loggers.get('user'),
  notifyLog = winston.loggers.get('notifies'),
  errorLog = winston.loggers.get('errors');

exports.name = 'kabamPluginLoggerFile';

exports.listeners = {
  'http' : function(html){
/*
    httpLog.info('info',
      html.startTime,' - ',
      html.method,
      html.uri,
      html.statusCode,' - ',
      html.duration, 'ms', '/',
      html.ip,
      html.username, ':',
      html.email
    );
*/
  httpLog.info(html);
  },
  'error': function(err){
    errorLog.error(err);
  }
};
