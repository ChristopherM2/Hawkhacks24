const { SlashCommandBuilder } = require('@discordjs/builders');
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
        .setName('fish')
        .setDescription(`gone fishin'?`),
    async execute(interaction) {
        await dataa.connect()
        await interaction.deferReply()
        user = await dataa.db('User').collection('User').findOne({ id: interaction.member.id })

        const FISHES = [
            { name: 'Goldfish', value: 1 }, //25
            { name: 'Piranha', value: 2 }, //50
            { name: 'Salmon', value: 3 }, //100
            { name: 'Tuna', value: 4 } //200
        ];


        if (user) {
            if (user.fishtime + 30 <= Math.floor(Date.now() / 1000 | 0)) {


                const chance = Math.floor(Math.random() * 8) + 1;

                if (chance == 1) {
                    up = Math.round(user.balance + 25)
                    interaction.editReply({ content: `🎣 you caught a ${FISHES[0].name} your new balance is $${up}` })
                } else if (chance == 2) {
                    up = Math.round(user.balance + 50)
                    interaction.editReply({ content: `🎣 you caught a ${FISHES[1].name} your new balance is $${up}` })
                } else if (chance == 3) {
                    up = Math.round(user.balance + 100)
                    interaction.editReply({ content: `🎣 you caught a ${FISHES[2].name} your new balance is $${up}` })
                } else if (chance == 4) {
                    up = Math.round(user.balance + 200)
                    interaction.editReply({ content: `🎣 you caught a ${FISHES[3].name} your new balance is $${up}` })
                } else {
                    up = Math.round(user.balance + 0)
                    interaction.editReply({ content: `UNLUCKY NO FISH FOR YOU ` })
                }
                await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { balance: up, fishtime: Math.floor(Date.now() / 1000 | 0) } })
            }else{
                interaction.editReply({content:'slow down there buck a rou'})
            }
        }
        else {
            await interaction.reply({ content: `Couldnt find you? are you sure you have a profile?`, ephemeral: false });
        }
    },
}