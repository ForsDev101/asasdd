import { Client, GatewayIntentBits, PermissionsBitField } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`${client.user.tag} olarak giriş yapıldı.`);
});

// Örnek rol oluşturma komutu (!rololuştur <isim> <renk> <izin>)
client.on('messageCreate', async message => {
  if (!message.content.startsWith('!rololuştur')) return;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

  const args = message.content.split(' ').slice(1);
  const [isim, renk, ...izinler] = args;

  if (!isim || !renk) {
    return message.reply('Kullanım: `!rololuştur <isim> <renk> [izin1 izin2 ...]`');
  }

  try {
    const role = await message.guild.roles.create({
      name: isim,
      color: renk,
      permissions: izinler
    });

    message.reply(`✅ Rol oluşturuldu: <@&${role.id}>`);
  } catch (err) {
    console.error(err);
    message.reply('❌ Rol oluşturulurken hata oluştu.');
  }
});

client.login(process.env.TOKEN);
