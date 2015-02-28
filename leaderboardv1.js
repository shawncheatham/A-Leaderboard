// Database Collections
PlayersList = new Meteor.Collection('players');

// This is the Client 
if(Meteor.isClient){

	Template.leaderboard.helpers({
		'player': function(){
			return PlayersList.find()
		},

		'selectedClass': function(){
			var playerId = this._id;
			var selectedPlayer = Session.get('selectedPlayer');
				if(selectedPlayer === playerId){
					return "selected"
				}
		}
	});

	Template.leaderboard.events({
		'click li.player': function(){
			var playerId = this._id;
			Session.set('selectedPlayer', playerId);
			var selectedPlayer = Session.get('selectedPlayer');
			console.log(selectedPlayer);
		}
	});
}
// This is the Server
if(Meteor.isServer){

}