// Database Collections
PlayersList = new Meteor.Collection('players');

// This is the Client 
if(Meteor.isClient){

	Template.leaderboard.helpers({
		'player': function(){
			return PlayersList.find({}, {sort: {score: -1, name: 1}});
		},

		'selectedClass': function(){
			var playerId = this._id;
			var selectedPlayer = Session.get('selectedPlayer');
				if(selectedPlayer === playerId){
					return "selected"
				}
		},

		'showSelectedPlayer' : function(){
			var selectedPlayer = Session.get('selectedPlayer');
			return PlayersList.findOne(selectedPlayer);
		}
	});

	Template.leaderboard.events({
		'click li.player': function(){
			var playerId = this._id;
			Session.set('selectedPlayer', playerId);
			var selectedPlayer = Session.get('selectedPlayer');
			console.log(selectedPlayer);
		}, 

		'click #increment': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.update({_id: selectedPlayer}, {$inc: {score: 5}});
		},

		'click #subtract': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.update({_id: selectedPlayer}, {$inc: {score: -5}});
		},

		'click #remove': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.remove(selectedPlayer);
		}
	});

	Template.addPlayerForm.events({
		'submit form': function(event, template){
			event.preventDefault();
			var playerNameVar = template.find('#playerName').value;
			PlayersList.insert({
				name: playerNameVar,
				score: 0
			});
		}
	});
}
// This is the Server
if(Meteor.isServer){

}