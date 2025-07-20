require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} olarak çalışıyor.`);
});

client.on('messageCreate', async (message) => {
  if (message.content === '!rolleriolustur') {
    if (!message.guild) return;
    if (!message.member.permissions.has('Administrator')) {
      return message.reply("Bu komutu kullanmak için **yönetici** olmalısın.");
    }

    const kralliklar = [
      "Kutsal Roma", "Bizans", "Osmanlı", "Viking", "Moğol", "Sasani",
      "Frank", "Babür", "Emevi", "Macar", "Gürcü"
    ];

    const meslekRolleri = [
      "Madenci", "Demirci", "Fırıncı", "Avcı", "Balıkçı", "Oduncu",
      "Terzi", "Simyacı", "Çiftçi", "Tüccar", "Şifacı",
      "Dülger", "Taksidermist", "Müzisyen"
    ];

    const yetkiliRolleri = [
      "Founder", "Admin", "Moderatör", "Destek Ekibi",
      "RP Yetkili", "Whitelist Yetkilisi"
    ];

    // Krallık rollerini oluştur
    for (const krallik of kralliklar) {
      await message.guild.roles.create({ name: `Kral | ${krallik}`, reason: 'RP Krallık Rolü' });
      await message.guild.roles.create({ name: `Veliaht | ${krallik}`, reason: 'RP Krallık Rolü' });
      await message.guild.roles.create({ name: `Vezir | ${krallik}`, reason: 'RP Krallık Rolü' });
      await message.guild.roles.create({ name: `Halk | ${krallik}`, reason: 'RP Krallık Rolü' });
    }

    // Meslek rollerini oluştur
    for (const meslek of meslekRolleri) {
      await message.guild.roles.create({ name: meslek, reason: 'RP Meslek Rolü' });
    }

    // Yetkili rollerini oluştur
    for (const yetkili of yetkiliRolleri) {
      await message.guild.roles.create({ name: yetkili, reason: 'Yönetim Rolü' });
    }

    message.reply("Tüm roller başarıyla oluşturuldu ✅");
  }
});

client.login(process.env.TOKEN);
