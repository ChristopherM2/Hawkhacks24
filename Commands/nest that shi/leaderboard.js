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
            .setName('leaderboard')
            .setDescription('screaming and cry'),
        async execute(interaction) {
            await interaction.deferReply()
            await dataa.connect()
            
            users = await dataa.db('User').collection('User').find({},{sort:{balance:-1}}).toArray()
            
           var embed = new EmbedBuilder()
           
           .setTitle('Leaderboard')
           .setColor('Green')
            .addFields(
                {
                    name:`First: ${users[0].name}`,
                    value:`$${users[0].balance}`
                }
            )
            if(users[1]){
                embed.addFields({name:`Second: ${users[1].name}`, value: `$${users[1].balance}`})
            }
            if(users[2]){
                embed.addFields({name:`Third: ${users[2].name}`, value: `$${users[2].balance}`})
            }
            if(users[3]){
                embed.addFields({name:`Fourth: ${users[3].name}`, value: `$${users[3].balance}`})
            }
            if(users[4]){
                embed.addFields({name:`Fifth: ${users[4].name}`, value: `$${users[4].balance}`})
            }
            
            
            await interaction.editReply({embeds: [embed]})
            await dataa.close()
            
        },
    };