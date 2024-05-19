
const { SlashCommandBuilder } = require('@discordjs/builders');
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
		.setName('cf')
		.setDescription('Double or nothing, whats a bot without gamblin')
		.addIntegerOption(option => 
			option.setName('amount').setDescription('Amount you want to cf')
			.setRequired(true)
			.setMinValue(1)
		),
	async execute(interaction) {
		await dataa.connect()
		await interaction.deferReply()
        user = await dataa.db('User').collection('User').findOne({id:interaction.member.id})
		
		bet = interaction.options.getInteger('amount')
		
		if(bet>user.balance){
			interaction.editReply({content:'Bro cannot afford that :sob:'})
		}
		else if (!user){
			await interaction.reply({ content: `Couldnt find you? are you sure you have a profile?`, ephemeral: false });
		 }
		else{
			chance = Math.round(Math.random())
		
			if(chance==1&& interaction.user.id!='465633111191978004'){
				up = Math.round(user.balance + bet)
				interaction.editReply({content:`You Won, adding $${bet} to your balance, your new balance is $${up}`})
			}else{
				up = Math.round(user.balance - bet)
				interaction.editReply({content:`You Lost, removing $${bet} from your balance, your new balance is $${up}`})
			}
			await dataa.db('User').collection('User').updateOne({id:interaction.member.id},{$set:{balance:up}})
		}
       
        await dataa.close()
	},
};