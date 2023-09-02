/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'import'],
    root: true,
    "settings": {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx", ".svg"]
        },
        "import/resolver": {
            "typescript": {
                "alwaysTryTypes": true,
                "project": "tsconfig.json"
            }
        }
    }
};
