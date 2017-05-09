var l10n = process.env.MOZ_L10n || 'ko'
module.exports = {
  database: {
    host: '128.199.201.64',
    name: 'ranking_mozillians',
    username: 'root',
    password: 'Mtiger0450l%',
    forceSync: false
  },
  source: {
    pontoon: 'https://pontoon.mozilla.org/' + l10n + '/ajax/contributors/'
  }
}
