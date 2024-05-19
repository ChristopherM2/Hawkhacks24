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
		.setName('bal')
		.setDescription('balance'),
	async execute(interaction) {
		
        await dataa.connect()
        movie = await dataa.db('User').collection('User').findOne({id:interaction.member.id})
		await interaction.reply({content:`$${movie.balance}`})
		await dataa.close()
        
	},
};