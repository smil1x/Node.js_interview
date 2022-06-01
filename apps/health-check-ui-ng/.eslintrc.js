module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.*?.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: ['plugin:@angular-eslint/recommended'],
      rules: { 'prettier/prettier': ['error', { endOfLine: 'auto' }] },
    },
    {
      files: ['*.html'],
      plugins: ['html'],
      settings: {
        'html/html-extensions': ['.html', '.we'], // consider .html and .we files as HTML
      },
    },
    {
      files: ['*.component.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        // "max-len": ["error", { "code": 140 }]
      },
    },
    {
      files: ['*.component.ts'],
      extends: ['plugin:@angular-eslint/template/process-inline-templates'],
    },
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      parserOptions: {
        project: './tsconfig.spec.json',
      },
      // Rules for linter
      extends: ['plugin:jasmine/recommended'],
      // Plugin for running the linter
      plugins: ['jasmine'],
      env: { jasmine: true },
      // Turn off 'no-unused-vars' rule
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.*?.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        // Стайл гайд AirBnB
        'airbnb-typescript/base',
        // Настройки для Prettier
        'prettier',
        'plugin:prettier/recommended',
      ],
      rules: {
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      },
    },
  ],
};
