const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const roles = [
  // Yönetim
  { name: 'Founder', emoji: '👑' },
  { name: 'Admin', emoji: '🛡️' },
  { name: 'Moderator', emoji: '🔧' },
  { name: 'Kayıt Sorumlusu', emoji: '📜' },
  { name: 'Geliştirici', emoji: '🧠' },
  { name: 'Yetkili Ekibi', emoji: '👥' },
  { name: 'Duyuru Ekibi', emoji: '📢' },
  { name: 'İstatistik Ekibi', emoji: '📊' },

  // Genel Meslekler
  { name: 'Genel Meslek Roller', emoji: '🧑‍🏭' },
  { name: 'Oduncu', emoji: '🪓' },
  { name: 'Madenci', emoji: '⛏️' },
  { name: 'Çiftçi', emoji: '🌾' },
  { name: 'Balıkçı', emoji: '🐟' },
  { name: 'Terzi', emoji: '🧵' },
  { name: 'Marangoz', emoji: '🪚' },
  { name: 'Demirci', emoji: '🔨' },
  { name: 'Fırıncı', emoji: '🍞' },
  { name: 'Kasap', emoji: '🥩' },
  { name: 'Aşçı', emoji: '🧂' },
  { name: 'Avcı', emoji: '🏹' },
  { name: 'Simyacı', emoji: '🧪' },
  { name: 'Tüccar', emoji: '💰' },
  { name: 'Vergici', emoji: '⚖️' },
  { name: 'Çoban', emoji: '🐑' },
  { name: 'Bilgin', emoji: '📚' },
  { name: 'Büyücü', emoji: '🔮' },
  { name: 'Sanatçı', emoji: '🎭' },
  { name: 'Köylü', emoji: '🧺' },
  { name: 'Kervancı', emoji: '📦' },
  { name: 'Seyis', emoji: '🐴' },
  { name: 'Zırhçı', emoji: '🛡️' },
  { name: 'Kâşif', emoji: '🗺️' },
  { name: 'Katip', emoji: '📜' },
  { name: 'Göçebe', emoji: '🧳' },
  { name: 'Şifacı', emoji: '🩺' },
  { name: 'Tamirci', emoji: '🔧' },
  { name: 'Mimar', emoji: '🏛️' },
  { name: 'Rune Ustası', emoji: '🪄' },
  { name: 'Ateş Ustası', emoji: '🔥' },
  { name: 'Denizci', emoji: '🛶' },
  { name: 'Kervan Koruyucusu', emoji: '🐪' },
  { name: 'Gece Bekçisi', emoji: '🏮' },
];

const kingdoms = [
  'Kutsal Roma', 'Bizans', 'Osmanlı', 'Viking',
  'Moğol', 'Sasani', 'Frank', 'Babür',
  'Emevi', 'Macar', 'Gürcü'
];

const kingdomRoles = [
  { type: 'Kralı', emoji: '👑' },
  { type: 'Veliahtı', emoji: '🤴' },
  { type: 'Komutanı', emoji: '⚔️' },
  { type: 'Muhafızı', emoji: '🛡️' },
  { type: 'Avcısı', emoji: '🏹' },
  { type: 'Madencisi', emoji: '⛏️' },
  { type: 'Demircisi', emoji: '🔨' },
  { type: 'Fırıncısı', emoji: '🍞' },
  { type: 'Çiftçisi', emoji: '🌾' },
  { type: 'Balıkçısı', emoji: '🐟' },
  { type: 'Terzisi', emoji: '🧵' },
  { type: 'Tüccarı', emoji: '💰' },
  { type: 'Simyacısı', emoji: '🧪' },
  { type: 'Şifacısı', emoji: '🩺' },
];

client.once('ready', async () => {
  console.log(`${client.user.tag} giriş yaptı.`);

  const guild = client.guilds.cache.first(); // İlk sunucuyu al

  if (!guild) {
    console.log('Bot bir sunucuda değil.');
    return;
  }

  // Yönetim ve genel meslek rolleri
  for (const role of roles) {
    const roleName = `${role.emoji} ${role.name}`;
    if (!guild.roles.cache.find(r => r.name === roleName)) {
      await guild.roles.create({ name: roleName, reason: 'Otomatik rol ekleme' });
      console.log(`Oluşturuldu: ${roleName}`);
    }
  }

  // Krallıklara özel roller
  for (const kingdom of kingdoms) {
    for (const role of kingdomRoles) {
      const roleName = `${role.emoji} ${kingdom} ${role.type}`;
      if (!guild.roles.cache.find(r => r.name === roleName)) {
        await guild.roles.create({ name: roleName, reason: 'Krallık rolü ekleme' });
        console.log(`Oluşturuldu: ${roleName}`);
      }
    }
  }

  console.log('Tüm roller oluşturuldu!');
});

client.login(process.env.TOKEN);
