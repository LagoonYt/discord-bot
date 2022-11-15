import DiscordJS, { Interaction, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    permissions: ['MANAGE_ROLES'],
    category: 'testing',
    description: 'Creates a looking for group request!',
    slash: true,
    testOnly: true,
    guildOnly: true,
    ephimeral: true,
    options: [
        {
            name: 'user',
            description: 'The game you are looking to play!',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER,
        },
        {
            name: 'time',
            description: 'How long for in mins?',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.INTEGER,
        },
        {
            name: 'reason',
            description: 'Why are they in jail?',
            required: false,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        },        
],
    callback: async ({interaction:msgInt,args,guild}) =>{ 
        const time = msgInt.options.getInteger('time', true)
        const Reason = msgInt.options.getString('Reason')

        const memberID = args.shift()!.replace(/[<@!&>]/g, '')
        const roleID = guild!.roles.cache.find(r => r.name === 'Inmate')
        
        const member = guild!.members.cache.get(memberID)
        const role = guild!.roles.cache.get(roleID!.id)
        if(!member) return msgInt.reply('Could not find member')
        
        member.roles.add(role!)
        member.send(`You have been locked in jail for ${time} mins for ${Reason}`)
        msgInt.reply(`${member} has been locked in jail for ${time} mins for ${Reason}`)


        setTimeout(() => {
            member.roles.remove(role!)
            member.send(`You have been removed from jail`)
            msgInt.reply(`${member} has been removed from jail`)
        }
        , time * 1000 * 60)

    }, 

} as ICommand