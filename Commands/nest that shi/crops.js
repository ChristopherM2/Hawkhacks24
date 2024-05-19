const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
		.setName('crops')
		.setDescription('Show all available crops and their values'),
	async execute(interaction) {
		await dataa.connect()
        
        await interaction.deferReply()
        // Send a ping to confirm a successful connection
     
        const movie = await dataa.db('User').collection('User').findOne({id:interaction.member.id})
        if(!movie){
           await interaction.editReply({ content: `Couldnt find you? are you sure you have a profile?`, ephemeral: false });
        }
        else{
            var items = (Math.floor(Date.now()/1000|0)-movie.last  )*movie.speed
            if(items>movie.backSize){
                items = movie.backSize
            }
            
            //constant values for crops for easy changing :3
            const CARROT = 1
            const BROCCOLI = 2
            const POTATO = 4
            const WATERMELON = 6
            const BELL = 10

            const embed = new EmbedBuilder()
            .setTitle('All Available Crops')
            .setColor('Yellow')
            //.setAuthor({name:`${interaction.user.username}`})
            .setTimestamp()
            .addFields(
                {
                name: 'All crop tiers',
                value:'Each crop upgrade increases the base sell value'
            },{
                name: '🥕 Carrot:',
                value: `$${CARROT}`
            },{
                name: '🥦 Broccoli:',
                value: `$${BROCCOLI}`
            },{
                name: '🥔 Potato:',
                value: `$${POTATO}`
            },{
                name: '🍉 Watermelon:',
                value: `$${WATERMELON}` 
            },{
                name: '🫑 Bell Pepper:',
                value: `$${BELL}`
            })
            await interaction.editReply({ embeds: [embed], ephemeral: false });
            dataa.close()
        }
        
        
	}
}
