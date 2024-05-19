const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { MongoClient, ServerApiVersion } = require("mongodb");
const config = require('./config.json')
const uri = config.mongo;
	// Create a MongoClient with a MongoClientOptions object to set the Stable API version
	const dataa = new MongoClient(uri,  {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			}
		}
	);

 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('information'),
	async execute(interaction) {
		
        embed = new EmbedBuilder().setTitle('Help Page').setDescription('Some help for you!').setTimestamp()
        .setColor('Fuchsia').addFields({
            name:'Currency',
            value:'In our virtual game you are a farmer, you have a limited amount of backpack space. You must return to base to sell your crops "/sell" \nYou can also Change the type of crop you have by buying a seed starting pack using "/buy" for more info use /crops'
        },{
            name:'Upgrades',
            value:'Currently you harvest a crop every 4 seconds (0.25 per second) and hold a maximum of 50 items before you have to sell you can increase this by buying upgrades using /upgrades and /buy'
        },{
            name:'Misc:',
            value: 'We offer a leaderboard to compare your net worth (Balance) to other people globally, we also offer a fishing minigame by using /fish. \nUse /profile to see information about yourself'
        },{
            name:'Gambling',
            value:'Whats a bot without gambling :sob: you can use /cf to double or nothing your money '
        })
       await interaction.reply({embeds: [embed]})
	},
};