module.exports = {
    input: ['src/**/*.tsx'],
    output: 'src/i18n/locales/$LOCALE.json',
    locales: ['en', 'it'],
    sort: true,
};