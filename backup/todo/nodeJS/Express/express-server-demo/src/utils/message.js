
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from './callback-message';

class Message {

  static success(type, dtableVersion) {

    let message = {
      status: 1, 
      message: SUCCESS_MESSAGE[type],
      dtable_version: dtableVersion
    };

    return message;

  }
  
  static fail(type) {

    let message = {
      status: 0, 
      error_type: type,
      message: ERROR_MESSAGE[type]
    };
    return message;
  }

}

export default Message;