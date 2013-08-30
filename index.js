var winston = require('winston');

winston.logger.add('http_access',{
file: {
      filename: process.cwd()+'/http_access.log'
    }
});

winston.logger.add('users',{
file: {
      filename: process.cwd()+'/users.log'
    }
});

winston.logger.add('notify',{
file: {
      filename: process.cwd()+'/notifies.log'
    }
});

winston.logger.add('errors',{
file: {
      filename: process.cwd()+'/errors.log'
    }
});


var httpLog = winston.loggers.get('http_access'),
  userLog = winston.loggers.get('user'),
  notifyLog = winston.loggers.get('notifies'),
  errorLog = winston.loggers.get('errors');

exports.name = 'kabamPluginLoggerFile';

exports.exports.listeners = {
  'html' : function(html){
    httpLog.info('info',
    html.startTime, '-',
    html.method,
    html.uri,
    html.code, ' - ',
    html.duration, 'ms', '/',
    html.ip,
    html.username, ':'
    html.email);
  },
  'error': function(err){
    errorLog.error(err));
  }
};
