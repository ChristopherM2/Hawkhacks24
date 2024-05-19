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
		.setName('upgrades')
		.setDescription('Show all upgrades'),
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
            
            const embed = new EmbedBuilder()
            .setTitle('All Available Crops')
            .setColor('Red')
            //.setAuthor({name:`${interaction.user.username}`})
            .setTimestamp()
            .addFields(
                {
                name:'Balance: ', value: `$${movie.balance}`
            },{
                name: 'Crops',
                value:'Each crop upgrade increases the base sell value (to see crop value: /crops)\n 🥕 Carrot \n 🥦 Broccoli ($1000) \n 🥔 Potato ($2000) \n 🍉 Watermelon ($5000) \n 🫑 Bell Peppers ($10000)'
            },{
                name: 'Backpack Size',
                value: `The total amount of crops you can hold at once (each upgrade increases by 50) \n 🎒 Normal Backpack \n 👜 $1000 Large Backpack (current bag capacity + 10) \n 🧳 $10000 X-tra Large Backpack (current bag capacity x 2)`
            },{
                name: 'Clocks',
                value: `The rate at which crops idly grow (each clock increases by 0.25 crops/sec) \n ⌚ Normal Clock \n ⏱ $500 Fast Clock (+0.1 crops/sec) \n \n ⏰ $50000 2x Clock (current crops/sec x 2)`
            })
            await interaction.editReply({ embeds: [embed], ephemeral: false });
            dataa.close()
        }
        
        
	}
}
