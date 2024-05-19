const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
		.setName('sell')
		.setDescription('sells all things currently farmed'),
	async execute(interaction) {
		await interaction.deferReply()
        await dataa.connect()
        user = await dataa.db('User').collection('User').findOne({id:interaction.member.id})
       
		if(user){
		
			var items = Math.round((Math.floor(Date.now()/1000|0)-user.last  )*(user.speed+user.Upgrades.time)*user.Upgrades.bigtime)
        if(items>user.backSize*user.Upgrades.size){items = user.backSize*user.Upgrades.size}

		
        up = Math.floor(user.balance + user.crop.worth*items)

       
		await dataa.db('User').collection('User').updateOne({id:interaction.member.id},{$set:{balance:up, last: Math.floor(Date.now()/1000|0) }})
       
		
		embed = new EmbedBuilder().setTitle('Sold').setDescription(`Sold ${items} ${user.crop.current} for $${user.crop.worth*items}💰`).setColor('Red')
		.setTimestamp()
		
		interaction.editReply({embeds: [embed]})
		dataa.close()}else{
			interaction.editReply({content:'use /start first'})
		}
	},
};