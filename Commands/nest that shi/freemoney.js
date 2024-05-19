const { SlashCommandBuilder } = require('discord.js');
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
		.setName('free')
		.setDescription('freez'),
	async execute(interaction) {
		
        await dataa.connect()
		meow = ['292095595869372417','481260726703620106','465633111191978004','431904872942665739']
		if(meow.includes(interaction.member.id) ){
            await dataa.db('User').collection('User').updateOne({id:interaction.member.id},{$set:{balance:9999999 }})
        
		await interaction.reply({content:'mayb'})
		}
		else{
			await interaction.reply({content:'mayb not :speak:'})
		}
		await dataa.close()
        
	},
};