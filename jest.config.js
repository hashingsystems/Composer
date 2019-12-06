module.exports = {
    verbose: true,
    setupFiles: ['./src/javascript/__setup__/setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/tests/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/src/tests/__mocks__/styleMock.js'
    },
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    moduleDirectories: ['node_modules', 'src/html', 'src/icons']
}
