const { SlashCommandBuilder } = require('discord.js');
const { MongoClient, ServerApiVersion } = require("mongodb");
const config = require('./config.json')
const uri = config.mongo;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const dataa = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);


module.exports = {
    data: new SlashCommandBuilder()
        .setName('give')
        .setDescription('give money to someone')
        .addUserOption(option =>
            option
                .setName('who')
                .setDescription('The member to give')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('How much love do you wanna give')
                .setRequired(true)
                .setMinValue(0)
        ),
    async execute(interaction) {
        await interaction.deferReply()
        await dataa.connect()
        let user = await dataa.db('User').collection('User').findOne({ id: interaction.member.id });
        let other = await dataa.db('User').collection('User').findOne({ id: interaction.options.getUser('who').id });
        let amount = interaction.options.getInteger('amount');

        if (user.balance >= amount) {
            if (other && user) { 
            await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { balance: user.balance - amount } });
            await dataa.db('User').collection('User').updateOne({ id: interaction.options.getUser('who').id }, { $set: { balance: other.balance + amount } });
            interaction.editReply({ content: `Done! you now have $${user.balance - amount}` })
        }else{
            interaction.editReply({ content: `Someone isnt real:(` })
        }
    }
        else{

        interaction.editReply({ content: `Broke BOI :speak:` })

    }
        
        await dataa.close()

},
};