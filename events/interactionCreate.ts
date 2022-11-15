//require LFG.TS


if (!interaction.isButton()) return;

if (interaction.customId === "Accept") {
   interaction.reply({ content: "My button runs all the time!" });
}