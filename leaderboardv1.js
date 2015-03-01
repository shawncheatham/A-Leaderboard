// Database Collections
PlayersList = new Meteor.Collection('players');

// This is the Client 
if(Meteor.isClient){

	Meteor.subscribe('thePlayers');

	// Template Helpers
	Template.leaderboard.helpers({
		// Getting Players for User, show and sort
		'player': function(){
			var currentUserId = Meteor.userId();
			return PlayersList.find({ createdBy: currentUserId }, {sort: {score: -1, name: 1}});
		},
		// Selecting the Player within the list
		'selectedClass': function(){
			var playerId = this._id;
			var selectedPlayer = Session.get('selectedPlayer');
				if(selectedPlayer === playerId){
					return "selected"
				}
		},
		// Show the Player being selected from the list
		'showSelectedPlayer' : function(){
			var selectedPlayer = Session.get('selectedPlayer');
			return PlayersList.findOne(selectedPlayer);
		}
	});
	// Events related to adding new Player
	Template.leaderboard.events({
		
		// Selecting the player and storing for session
		'click li.player': function(){
			var playerId = this._id;
			Session.set('selectedPlayer', playerId);
			var selectedPlayer = Session.get('selectedPlayer');
		}, 
		
		// For selected Player, add 5 points
		'click #increment': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			Meteor.call('modifiedPlayerScore', selectedPlayer, 5);
		},
		
		// For selected Player, subtract 5 points
		'click #subtract': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			Meteor.call('modifiedPlayerScore', selectedPlayer, -5);
		},

		// Remove the selected Player
		'click #remove': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			Meteor.call('removePlayer', selectedPlayer);
		}
	});

	// Add Player to list for given User
	Template.addPlayerForm.events({
		'submit form': function(event){
			event.preventDefault();
			var playerNameVar = event.target.playerName.value;
			console.log(playerNameVar);
			Meteor.call('insertPlayerData', playerNameVar);
		}
	});
}
// This is the Server
if(Meteor.isServer){
	Meteor.publish('thePlayers', function(){
		var currentUserId = this.userId;
		return PlayersList.find({ createdBy: currentUserId });
	});

	Meteor.methods({
		'insertPlayerData': function(playerNameVar){
			var currentUserId = Meteor.userId();
			PlayersList.insert({
				name: playerNameVar,
				score: 0,
				createdBy: currentUserId
			})
			console.log("Hello World");
		},

		'removePlayer': function(selectedPlayer){
			PlayersList.remove(selectedPlayer);
		},

		'modifiedPlayerScore': function(selectedPlayer, scoreValue){
			PlayersList.update({_id: selectedPlayer}, {$inc: {score: scoreValue}});
		}
	});
}