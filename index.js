// Node.js ile Discord sunucu kurulum botu (discord.js v14+ kullanır)
// Komut: !başla → Sunucuyu kurar

import { Client, GatewayIntentBits, Partials } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

client.once('ready', () => {
  console.log(`Bot aktif: ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.content === '!başla' && message.guild && message.member.permissions.has('Administrator')) {
    const guild = message.guild;

    const categories = {
      '📚 GENEL': ['📜・kurallar', '📌・rol-al', '💬・sohbet', '🎙・genel-ses'],
      '⚒️ MESLEKLER': ['⛏・madenci', '🌾・çiftçi', '🎣・balıkçı', '🏹・avcı', '🍞・fırıncı', '🔨・demirci', '💎・taş-ustası', '🧪・simyacı', '📦・tüccar', '🎭・sanatçı', '🧵・terzi'],
      '🏛️ SİSTEM': ['💰・ekonomi', '⚔・savaş', '📈・istatistik', '📜・günlükler'],
      '🛡️ YÖNETİM': ['🛠・admin-log', '🚨・ceza-kayıt']
    };

    const kralliklar = [
      'Kutsal Roma', 'Bizans', 'Osmanlı', 'Viking', 'Moğol',
      'Frank', 'Sasani', 'Babür', 'Emevi', 'Macar', 'Gürcü'
    ];

    // Kategorileri ve kanalları oluştur
    for (const [catName, channels] of Object.entries(categories)) {
      const category = await guild.channels.create({
        name: catName,
        type: 4 // CATEGORY
      });

      for (const ch of channels) {
        if (ch.includes('🎙')) {
          await guild.channels.create({
            name: ch,
            type: 2, // VOICE
            parent: category.id
          });
        } else {
          await guild.channels.create({
            name: ch,
            type: 0, // TEXT
            parent: category.id
          });
        }
      }
    }

    for (const k of kralliklar) {
      const category = await guild.channels.create({
        name: `🏰・${k}`,
        type: 4
      });
      await guild.channels.create({
        name: '💬・krallık-sohbet',
        type: 0,
        parent: category.id
      });
      await guild.channels.create({
        name: '🎙・krallık-ses',
        type: 2,
        parent: category.id
      });
    }

    const roles = [
      '⛏ Madenci', '🌾 Çiftçi', '🎣 Balıkçı', '🏹 Avcı', '🍞 Fırıncı',
      '🔨 Demirci', '💎 Taş Ustası', '🧪 Simyacı', '📦 Tüccar', '🎭 Sanatçı', '🧵 Terzi'
    ];
    for (const roleName of roles) {
      await guild.roles.create({ name: roleName });
    }

    await message.reply('Sunucu başarıyla kuruldu!');
  }
});

client.login(TOKEN);
