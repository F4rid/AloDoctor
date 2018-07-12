import DB from './../mixins/DB';
import repository from './../services/Core';

// User model for storing data from user service
class UserModel {
  
  constructor(name, type, phoneNumber = null, nationalCode = null, password = null) {    
    this.id = DB.generateToken();
    this.name = name;
    this.type = type;
    this.phoneNumber = phoneNumber;
    this.nationalCode = nationalCode;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static all (sortBy) {
    if (!sortBy) sortBy = [['updatedAt', true]];
    return repository.objects('User').sorted(sortBy);
  }

  static find(phoneNumber) {
        
    user = repository.objects('User').filtered("phoneNumber = '" + phoneNumber + "'");

    if (user.length)
    {
      return user;
    }

    return undefined;
  }

  static search(query) {
        
    users = repository.objects('User').filtered("name = '" + query + "'" + " OR phoneNumber = '" + query + "'"  + " OR nationalCode = '" + query + "'");

    if (users.length)
    {
      return users;
    }

    return undefined;
  }

  static findByNationalCode(nationalCode) {
        
    user = repository.objects('User').filtered("nationalCode = '" + nationalCode + "'");

    if (user.length)
    {
      return user;
    }

    return undefined;
  }

  static findByToken(accessToken) {
      user = repository.objects('User').filtered("accessToken = '" + accessToken + "'");

      if (user.length)
      {
        return user;
      }

      return undefined;
  }

  static save(user) {
    if (repository.objects('User').filtered("name = '" + user.name + "'").length) return;

    repository.write(() => {
      user.updatedAt = new Date();
      repository.create('User', user);
    })
  }

  static update(user, callback) {
    if (!callback) return;
    repository.write(() => {
      callback();
      user.updatedAt = new Date();
    });
  }

  static destroy(phoneNumber)
  {
    let user = repository.objects('User').filtered("phoneNumber = '" + phoneNumber + "'");
    
    repository.write(() => {
        repository.delete(user);
    })
  }
  
}

module.exports = UserModel;