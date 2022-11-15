import DiscordJS, { Interaction, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    category: 'testing',
    description: 'Creates a looking for group request!',
    slash: true,
    testOnly: false,
    options: [
        {
            name: 'game',
            description: 'The game you are looking to play!',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        },
        {
            name: 'time',
            description: 'The time you are looking to play!',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        },
        {
            name: 'rank',
            description: 'Your current rank!',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        },        
        {
            name: 'in-game-info',
            description: 'Your in game name and code!',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        },      
        {
            name: 'server',
            description: 'The server you play on!',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        },  
        {   
        name: 'players',
            description: 'How many players are you looking for?',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
        },           
        {   
            name: 'extra',
            description: 'Anything extra you would like to add!',
            required: false,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        },
],

    callback: async ({interaction:msgInt,channel}) =>{
        // const row = new MessageActionRow()
        // .addComponents(
        //     new MessageButton()
        //     .setCustomId('Accept')
        //     .setEmoji('👍')
        //     .setLabel('ACCEPT')
        //     .setStyle('SUCCESS')
        // )
        // .addComponents(
        //     new MessageButton()
        //     .setCustomId('Tenative')
        //     .setEmoji('🤷‍♂️')
        //     .setLabel('TENATIVE')
        //     .setStyle('PRIMARY')
        // )
        
        const game = msgInt.options.getString('game')
        const time = msgInt.options.getString('time')
        const rank = msgInt.options.getString('rank')?.toString()
        const igi = msgInt.options.getString('in-game-info')
        const server = msgInt.options.getString('server')
        const players = msgInt.options.getNumber('players')
        const extra = msgInt.options.getString('extra')
        // const rank1 = rank!.toLowerCase()

        // if (rank1=='unranked'){
        //     const Image = ('https://i.imgur.com/XqQZQZq.png')
        
        // } else if(rank1 == 'iron'){
        //     const Image = ('https://i.imgur.com/XqQZQZq.png')

        // } else if(rank1 == 'bronze'){
        //     const Image = ('https://i.imgur.com/XqQZQZq.png')
        
        // } else if(rank1 == 'silver'){
        //     const Image = ('https://i.imgur.com/XqQZQZq.png')

        // } else if(rank1 == 'gold'){
        //     const Image = ('https://i.imgur.com/XqQZQZq.png')
        
        // } else if(rank1 == 'platinum'){
        //     const Image = ('https://i.imgur.com/XqQZQZq.png')
        
        // } else if(rank1 == 'diamond'){
        //     const Image = ('https://i.imgur.com/XqQZQZq.png')
        
        // } else if(rank1 == 'ascendant'){
        //     const Image = ('https://i.imgur.com/XqQZQZq.png')
        
        
        // } else if(rank1 == 'immortal'){
        //     const Image = ('https://i.imgur.com/XqQZQZq.png')
        
        // } else if(rank1 == 'radient'){
        //     const Image = ('https://i.imgur.com/XqQZQZq.png')
        
        // } else { const Image = ('https://i.imgur.com/XqQZQZq.png')}

        const embed = new MessageEmbed()
        .setTitle(`Looking for ${game} group!`)
        .setDescription(`${msgInt.user.username} is looking to play ${game} at ${time}!
        
        **Extra Info:**
        **Rank:** ${rank}
        **In Game Name:** ${igi}
        **Server:** ${server}
        **Players:** ${players}
        **Extra:** ${extra}

        `)
        .setColor('#ff0000')
        // .setImage(`${Image}`)
        .setFooter(`${msgInt.user.tag}`)
        

        await msgInt.reply({
            embeds: [embed],
            // components: [row],
            
        })



        const collector = channel.createMessageComponentCollector({
            max: 10,
        })

        collector.on('collect', (i: MessageComponentInteraction) => {
            console.log(`sorry ${i.user.username} we are still working on this!`)
            i.reply({
                content: `Sorry ${i.user.username} we are still working on this!`,
                ephemeral: true
            })
        })
        // collector.on('collect', (i: MessageComponentInteraction) => {
        //     console.log(`Button with id: ${i.customId} was pressed by ${i.user.username}`)
        //     i.reply({
        //         content: `Button with id: ${i.customId} was pressed by ${i.user.username}`,
        //         ephemeral: true
        //     })
        // })

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
                
            })
        })


        
    },


} as ICommand