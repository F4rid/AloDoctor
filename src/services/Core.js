import Realm from 'realm';

let repository = new Realm({
        schema: [
        {
          name: 'User',
          primaryKey: 'id',
          properties: {
              id: {type: 'string', indexed: true},
              name: 'string',
              type: 'string',
              phoneNumber: 'string?',
              nationalCode: 'string?',
              password: 'string?',
              accessToken: 'string?',
              createdAt: 'date',
              updatedAt: 'date'
          }
       },
        {
            name: 'MeetingTime',
            primaryKey: 'id',
            properties: {
                id: {type: 'string', indexed: true},
                time: 'string',
                type: 'string'
            }
        },
        {
            name: 'Schedule',
            primaryKey: 'id',
            properties: {
                id: {type: 'string', indexed: true},
                date: 'string',
                time: 'string',
                secretary_id: 'string',
                user_national_code: 'string',
                cause_of_referral: 'string',
                status: {type: 'string', default: 'waiting'},
            }
        },
        {
            name: 'Payment',
            primaryKey: 'id',
            properties: {
                id: {type: 'string', indexed: true},
                schedule_id: 'string',
                amount: 'int',
                type: 'string'
            }
        }

   ]
    
});

module.exports = repository;