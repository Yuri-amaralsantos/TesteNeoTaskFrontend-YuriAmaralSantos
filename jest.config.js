module.exports = {
    transformIgnorePatterns: ['node_modules/(?!axios)'],
    rootDir: '.',
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['<rootDir>/setupJest.js'],
    setupFiles: ['jest-localstorage-mock'],
}