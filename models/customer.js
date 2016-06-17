var app = require("../app");
var db = app.get("db");


var Customer = function(customer) {
  this.id = customer.id
  this.name = customer.name
  this.registered_at = customer.registered_at
  this.address = customer.address
  this.city = customer.city
  this.state = customer.state
  this.postal_code = customer.postal_code
  this.phone = customer.phone
  this.account_credit = customer.account_credit
}

// takes on parameter(callback)-then run db.accounts.find
Customer.all = function(callback) {
  // then run db.accounts.find(no specific id or column - just another callback)
  db.customers.find(function(error, customers) {
    if(error || !customers) {
      // handling any error
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      // saying there was no error, accounts is an array and we map it
      callback(null, customers.map(function(customer) {
        // and return to a new instance of the account with id
        return new Customer(customer);
      }));
    };
  });
};

Customer.sortByName = function(input, callback) {
  db.run ("SELECT * FROM customers ORDER BY name LIMIT $1 OFFSET $2;", input, function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customer(customer);
      }));
    };
  });
}


module.exports = Customer;
