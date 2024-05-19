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
		.setName('profile')
		.setDescription('Shows user stats'),
	async execute(interaction) {
		await dataa.connect()
        
        
        // Send a ping to confirm a successful connection
     
        movie = await dataa.db('User').collection('User').findOne({id:interaction.member.id})
        if(!movie){
           await interaction.reply({ content: `Couldnt find you? are you sure you have a profile?`, ephemeral: false });
        }
        else{
            var items = (Math.floor(Date.now()/1000|0)-movie.last  )*(movie.speed+movie.Upgrades.time)*movie.Upgrades.bigtime
            if(items>movie.backSize*movie.Upgrades.size){
                items = movie.backSize*movie.Upgrades.size
            }
            const embed = new EmbedBuilder()
            .setTitle('Profile')
            .setColor('Green')
            .setAuthor({name:`${interaction.user.username}`})
            .setTimestamp()

            .addFields({
                name:'Balance: ', value: `$${movie.balance}`
            },{
                name: 'Crops:',
                value: `${Math.round(items)}/${movie.backSize*movie.Upgrades.size}`
            },{
                name: 'Speed:',
                value: `You are currently farming ${(movie.speed+movie.Upgrades.time)*movie.Upgrades.bigtime} items per second`
            },{
                name: 'Price per crop',
                value: `Each crop is worth $${movie.sellAmount}`
            },{
                name:'Upgrades:',
                value:`
                Small time muli: ${movie.Upgrades.time} <:haram:1052722978602876929>\u200B
                Backpack Size muli: ${movie.Upgrades.size} <:BIMBER:1102785695635996742> \u200B
                Large time muli: ${movie.Upgrades.bigtime} <:MONKEYWOAH:1085418040365154395> `,
               inline:true
            });
            
            interaction.reply({ embeds: [embed], ephemeral: false });
        }
        
        dataa.close()
	},
};