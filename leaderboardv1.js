// Database Collections
PlayersList = new Meteor.Collection('players');



// This is the Client 
if(Meteor.isClient){
  Template.leaderboard.helpers({
    player: function(){
      return PlayersList.find();
    }
  });
}

// This is the Server
if(Meteor.isServer){
}