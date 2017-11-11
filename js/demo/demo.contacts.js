define(function(require) {
    var Contact = require('models/model.contact');
    
    var contactNeo = new Contact({
        id: 1,
        name: 'Neo',
        group: 'Work',
        phone: '123-456-7890'
    })
    
    var contactMoprhius = new Contact({
        id: 2,
        name: 'Morphius',
        group: 'Work',
        phone: '123-000-7890'
    })
    
    var contactTrinity = new Contact({
        id: 3,
        name: 'Trinity',
        group: 'Family',
        phone: '123-777-7890'
    })
    
    return [contactNeo, contactMoprhius, contactTrinity];
})