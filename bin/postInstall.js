const { execSync } = require('child_process');
const { platform } = require('os');
[
    // Patch all the necessary modules.
    { command: 'npx patch-package' },

    // Make sure we're set up correctly
    { command: 'solidarity' },

    // Kill the metro bundler if it's running.
    { command: 'pkill -f "cli.js start" || set exit 0', onlyPlatforms: ['darwin', 'linux'] },
    // Help wanted: Add the windows version here. { command: "????", onlyPlatforms: ["win32"] },

    // Make sure our native modules are androidX-happy
    // { command: "jetify" },

    // on iOS, make sure our native modules are installed
    // { command: 'pod deintegrate', cwd: 'ios', onlyPlatforms: ['darwin'] },
    // { command: 'pod install', cwd: 'ios', onlyPlatforms: ['darwin'] },
]
    .filter(({ onlyPlatforms }) => !onlyPlatforms || onlyPlatforms.includes(platform()))
    .forEach((commandAndOptions) => {
        const { command, onlyPlatform: any, ...options } = commandAndOptions;
        try {
            execSync(command, {
                stdio: 'inherit',
                ...options,
            });
        } catch (error) {
            process.exit(error.status);
        }
    });
