import DB from './../mixins/DB';
import repository from './../services/Core';

// User model for storing data from user service
class ScheduleModel {

  constructor(date, time, secretary_id, user_national_code, cause_of_referral, status) {
    this.id = DB.generateToken();
    this.date = date;
    this.time = time;
    this.secretary_id = secretary_id;
    this.user_national_code = user_national_code;
    this.cause_of_referral = cause_of_referral;
    this.status = status;
  }

  static all(sortBy) {
    if (!sortBy) sortBy = [['date', true]];
    return repository.objects('Schedule').sorted(sortBy);
  }

  static find(id) {
        
    schedule = repository.objects('Schedule').filtered("id = '" + id + "'");

    if (schedule.length)
    {
      return schedule;
    }

    return undefined;
  }

  static findByDate(date) {
        
    schedule = repository.objects('Schedule').filtered("date = '" + date + "'");

    if (schedule.length)
    {
      return schedule;
    }

    return undefined;
  }

  static save(schedule) {
    repository.write(() => {
      repository.create('Schedule', schedule);
    })
  }

  static update(schedule, callback) {
    if (!callback) return;
    repository.write(() => {
      callback();
    });
  }

  static destroy(id)
  {
    let schedule = repository.objects('Schedule').filtered("id = '" + id + "'");
    
    repository.write(() => {
        repository.delete(schedule);
    })
  }

}

module.exports = ScheduleModel;