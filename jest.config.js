module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    "globals": {
        "ts-jest": {
            "tsConfig": "<rootDir>/src/tsconfig.spec.json",
            "stringifyContentPathRegex": "\\.html$",
            "astTransformers": [
                "jest-preset-angular/InlineHtmlStripStylesTransformer"
            ]
        },
        "__TRANSFORM_HTML__": true
    },
    "transform": {
        '^.+\\.(ts|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
        '^.+\\.js$': 'babel-jest'
    },
    "testMatch": [
        "**/__tests__/**/*.+(ts|js)?(x)",
        "**/+(*.)+(spec|test).+(ts|js)?(x)"
    ],
    "moduleNameMapper": {
        "app/(.*)": "<rootDir>/src/app/$1",
        "assets/(.*)": "<rootDir>/src/assets/$1",
        "environments/(.*)": "<rootDir>/src/environments/$1",
        '^lodash-es$': 'lodash'
    },
    "moduleFileExtensions": ["js", "json", "jsx", "node", "ts", "tsx"],
    "transformIgnorePatterns": [
        "node_modules/(?!@ngrx)"
    ],
    "snapshotSerializers": [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js"
    ],
    verbose: false
};
