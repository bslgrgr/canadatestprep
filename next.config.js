const withPWA = require('next-pwa')({
    dest: 'public',
    //disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/canadatestprep/',
    sw: '/service-worker.js', // Ensure the path is correct
});

module.exports = withPWA({
    output: 'export',
    basePath: '/canadatestprep',
    assetPrefix: '/canadatestprep/',
});
