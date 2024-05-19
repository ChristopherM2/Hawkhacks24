const { SlashCommandBuilder } = require('discord.js');
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://chrism24747:RL44eaUP31Z2Hi91@cluster0.bm40y8x.mongodb.net/User";
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
		.setName('drop')
		.setDescription('drops database'),
	async execute(interaction) {
		
        await dataa.connect()
		meow = ['292095595869372417','481260726703620106','465633111191978004','431904872942665739']
		if(meow.includes(interaction.member.id) ){
        await dataa.db('User').collection('User').drop()
        
		await interaction.reply({content:'mayb'})
		}
		else{
			await interaction.reply({content:'mayb not :speak:'})
		}
		await dataa.close()
        
	},
};