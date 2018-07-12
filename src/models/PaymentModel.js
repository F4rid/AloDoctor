import DB from './../mixins/DB';
import repository from './../services/Core';

// User model for storing data from user service
class PaymentModel {
  constructor(schedule_id, amount, type) {
    this.id = DB.generateToken();
    this.schedule_id = schedule_id;
    this.amount = amount;
    this.type = type;
  }

  static all (sortBy) {
    return repository.objects('Payment');
  }

  static find (id) {
        
    payment = repository.objects('Payment').filtered("id = '" + id + "'");

    if (payment.length)
    {
      return payment;
    }

    return undefined;
  }

  static save (payment) {
    if (repository.objects('Payment').filtered("schedule_id = '" + payment.schedule_id + "'").length) return;

    repository.write(() => {
      repository.create('Payment', payment);
    })
  }

  static update (id, callback) {
    if (!callback) return;
    repository.write(() => {
      callback();
    });
  }

  static destroy (id)
  {
    let payment = repository.objects('Payment').filtered("id = '" + id + "'");
    
    repository.write(() => {
        repository.delete(payment);
    })
  }

}

module.exports = PaymentModel;