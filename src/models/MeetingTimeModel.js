import DB from './../mixins/DB';
import repository from './../services/Core';

// User model for storing data from user service
class MeetingTimeModel {
  
  constructor(time, type) {
    this.id = DB.generateToken();
    this.time = time;
    this.type = type;
  }

  static all (sortBy) {
    return repository.objects('MeetingTime');
  }

  static find (id) {
        
    timeObject = repository.objects('MeetingTime').filtered("id = '" + id + "'");

    if (timeObject.length)
    {
      return timeObject;
    }

    return undefined;
  }

  static save (time) {
    if (repository.objects('MeetingTime').filtered("time = '" + time.time + "'").length) return;

    repository.write(() => {
      repository.create('MeetingTime', time);
    })
  }

  static destroy (id)
  {
    let timeObject = repository.objects('MeetingTime').filtered("id = '" + id + "'");
    
    repository.write(() => {
        repository.delete(timeObject);
    })
  }
}

module.exports = MeetingTimeModel;