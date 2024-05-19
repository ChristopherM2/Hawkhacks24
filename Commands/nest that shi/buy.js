const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://chrism24747:RL44eaUP31Z2Hi91@cluster0.bm40y8x.mongodb.net/User";
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
        .setName('buy')
        .setDescription('allows you to upgrade or buy gear')
        .addStringOption(option =>
            option.setName('item').setDescription('What upgrade do you want to buy')
                .setRequired(true)
                .addChoices(
                    { name: 'Broccoli', value: '2' },
                    { name: 'Potato', value: '3' },
                    { name: 'Watermelon', value: '4' },
                    { name: 'Bell Pepper', value: '5' },
                    // add more upgrades :333333
                    { name: 'Bag Capacity', value: '6' },
                    { name: 'Bag Capacity Multipler', value: '9' },
                    { name: 'Small Speed Increase', value: '7' }, { name: 'Large Speed Multiply', value: '8' }
                )
        ),
    async execute(interaction) {
        await dataa.connect()


        await interaction.deferReply()

        crop = interaction.options.getInteger("crop")

        // Send a ping to confirm a successful connection
        const BROCCOST = 1000
        const POTCOST = 2000
        const WATERCOST = 5000
        const BELLCOST = 100000

        const BAGCOST = 1000
        const BAGGCOST = 10000
        const time = 500
        const TIMEM = 50000

        const BROCWORTH = 2
        const POTWORTH = 4
        const WATERWORTH = 6
        const BELLWORTH = 10

        user = await dataa.db('User').collection('User').findOne({ id: interaction.member.id })
        type = interaction.options.getString('item')
        switch (type) {
            case '2'://Broc
                if (user.balance >= BROCCOST) {
                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "crop.worth": BROCWORTH, "crop.current": `:broccoli:Brocoli's` } })

                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "balance": user.balance - BROCCOST } })
                    await interaction.editReply({ content: 'Upgrade Bought :thumbs_up: :fire:' })
                } else {
                    await interaction.editReply({ content: `You cannot afford this! you need $${BROCCOST - user.balance} more` })
                }
                break;
            case '3':
                if (user.balance >= POTCOST) {
                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "crop.worth": POTWORTH, "crop.current": `Potatoes's` } })

                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "balance": user.balance - POTCOST } })
                    await interaction.editReply({ content: 'Upgrade Bought :thumbs_up: :fire:' })
                } else {
                    await interaction.editReply({ content: `You cannot afford this! you need $${POTCOST - user.balance} more` })
                }
                break;
            case '4':
                if (user.balance >= WATERCOST) {
                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "crop.worth": WATERWORTH, "crop.current": `:Watermelons's` } })

                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "balance": user.balance - WATERCOST } })
                    await interaction.editReply({ content: 'Upgrade Bought :thumbs_up: :fire:' })
                } else {
                    await interaction.editReply({ content: `You cannot afford this! you need $${WATERCOST - user.balance} more` })
                }
                break;
            case '5':
                if (user.balance >= BELLCOST) {
                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "crop.worth": BELLWORTH, "crop.current": `Bell Peppers's` } })

                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "balance": user.balance - BELLCOST } })
                    await interaction.editReply({ content: 'Upgrade Bought :thumbs_up: :fire:' })
                } else {
                    await interaction.editReply({ content: `You cannot afford this! you need $${BELLCOST - user.balance} more` })
                }
                break;
            case '6'://bag
                if (user.balance >= BAGCOST) {
                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "backSize": user.backSize + 10 } })

                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "balance": user.balance - BAGCOST } })
                    await interaction.editReply({ content: 'Upgrade Bought :thumbs_up: :fire:' })
                } else {
                    await interaction.editReply({ content: `You cannot afford this! you need $${BAGCOST - user.balance} more` })
                }
                break;
            case '7':
                if (user.balance >= time) {//time
                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "Upgrades.time": user.Upgrades.time + .1 } })

                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "balance": user.balance - time } })
                    await interaction.editReply({ content: 'Upgrade Bought :thumbs_up: :fire:' })
                } else {
                    await interaction.editReply({ content: `You cannot afford this! you need $${time - user.balance} more` })
                }
                break;
            case '8':
                if (user.balance >= TIMEM) {//big time
                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "Upgrades.bigtime": user.Upgrades.bigtime + 1 } })

                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "balance": user.balance - TIMEM } })
                    await interaction.editReply({ content: 'Upgrade Bought :thumbs_up: :fire:' })
                } else {
                    await interaction.editReply({ content: `You cannot afford this! you need $${TIMEM - user.balance} more` })
                }
                break;
            case '9':
                if (user.balance >= BAGGCOST) {//big bag
                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "Upgrades.size": user.Upgrades.size + 1 } })

                    await dataa.db('User').collection('User').updateOne({ id: interaction.member.id }, { $set: { "balance": user.balance - BAGGCOST } })
                    await interaction.editReply({ content: 'Upgrade Bought :thumbs_up: :fire:' })
                } else {
                    await interaction.editReply({ content: `You cannot afford this! you need $${BAGGCOST - user.balance} more` })
                }
                break;

        }

        bal = user.balance








    }
}

