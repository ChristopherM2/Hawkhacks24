const { SlashCommandBuilder } = require('discord.js');
const { MongoClient, ServerApiVersion } = require("mongodb");
const config = require('./config.json');
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
		.setName('start')
		.setDescription('creates a new user or resets WITHOUT CONFIRMATION'),
	async execute(interaction) {
        await dataa.connect()
        await dataa.db('User').collection('User').deleteMany({id:interaction.member.id})
        
		var user = { 
			name:interaction.user.username,
			id:interaction.member.id,
			balance: 0, 
			backSize:50,
			speed:0.25,
			last:Math.floor(Date.now()/1000|0),
			sellAmount:1,
			Tuna:0,
			Piranha:0,
			Salmon:0,
			Goldfish:0,
			fishtime:0,
			crop:{
				current:"🥕Carrot's",
				worth:1
			},
			
			Upgrades:{
				time:0, //speed modifer
				size:1,
				
				bigtime:1,
				fishingrod:1,
				pet:0,
				moneymul:1
			}
			

		}
        await dataa.db('User').collection('User').insertOne(user)
		
        interaction.reply({content:'Done'})
        dataa.close()
	},
};