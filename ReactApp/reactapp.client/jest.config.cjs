module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.css$': '<rootDir>/MockModule.cjs', 
    },
    testEnvironment: 'jsdom',
};