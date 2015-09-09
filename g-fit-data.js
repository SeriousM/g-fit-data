if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


if (Meteor.isClient) {
  getGists = function getGists(user, callback) {
    Meteor.call('getGists', user, callback);
  }
}

if (Meteor.isServer) {
  Meteor.methods({
    'getGists': function getGists(user) {
      var GithubApi = Meteor.npmRequire('github');
      var github = new GithubApi({
          version: "3.0.0"
      });

      var gists = Async.runSync(function(done) {
        github.gists.getFromUser({user: 'arunoda'}, function(err, data) {
          done(null, data);
        });
      });

      return gists.result;
    }
  });
}
