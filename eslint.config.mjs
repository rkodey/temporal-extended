import    path_node           from 'node:path';
import    js                  from '@eslint/js';
import    tseslint            from 'typescript-eslint';
import    globals             from 'globals';
import  { FlatCompat }        from '@eslint/eslintrc';
import  { includeIgnoreFile } from '@eslint/compat';
import    pluginNoSecrets     from 'eslint-plugin-no-secrets';
import    pluginUnicorn       from 'eslint-plugin-unicorn';


// eslint --print-config eslint.config.mjs


const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

export default tseslint.config(

  includeIgnoreFile(path_node.resolve(process.cwd(), '.gitignore')),

  { ignores: ['build', 'dist', '**/*.snapshot.js'] },

  // https://typescript-eslint.io/users/configs/#projects-with-type-checking
  { name: '--- eslint js recommended' },
  js.configs.recommended,
  tseslint.configs.eslintRecommended,     // This is recommended to be used after eslint.configs.recommended
  tseslint.configs.strictTypeChecked,     // strictTypeChecked contains recommended, recommendedTypeChecked, and strict
  tseslint.configs.stylisticTypeChecked,

  // airbnb includes the import plugin -- so if it's ever removed, this block can add it back in
  // // @ts-expect-error no types available
  // import    importPlugin  from 'eslint-plugin-import';
  // { name: '--- import plugin' },
  // // importPlugin.flatConfigs.recommended,
  // // importPlugin.flatConfigs.typescript,

  { name: '--- airbnb extend includes import plugin' },
  ...compat.extends(
    'eslint-config-airbnb-base',
  ),

  pluginUnicorn.configs.recommended,
  {
    name: '--- plugin unicorn',
    rules: {
      'unicorn/explicit-length-check'     : ['off'],
      'unicorn/filename-case'             : ['off', { 'case': 'pascalCase' }],
      'unicorn/no-immediate-mutation'     : ['off'],
      'unicorn/no-process-exit'           : ['off'],
      'unicorn/prefer-regexp-test'        : ['off'],      // This format is less readable
      'unicorn/prefer-spread'             : ['off'],
      'unicorn/prefer-string-replace-all' : ['off'],
      'unicorn/prefer-ternary'            : ['off'],
      'unicorn/prefer-top-level-await'    : ['off'],
      'unicorn/prevent-abbreviations'     : ['off'],
    },
  },

  {
    name: '--- plugin no-secrets',
    plugins: { 'no-secrets'   : pluginNoSecrets },
    rules: {
      'no-secrets/no-secrets' : ['warn', {
        // 'tolerance': 3.9,    // default 4.00
        'additionalDelimiters': [String.raw `[()/\\]`],
        'additionalRegexes'   : {
          // These only match within strings and comments, so variable names don't match
          'Auth Header'       : /Authorization:\s*(Bearer|Basic)\s*[a-zA-Z0-9\-._~+/=]+/i,
          'Private Key'       : /-+\s*BEGIN\s+.*PRIVATE\s+KEY\s*-+/i,
        },
      }],
    },
  },

  {
    name: '--- languageOptions',
    languageOptions: {
      // ecmaVersion: 6,    // 2015=ES6, 2017 for async
      globals: {
        // ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: {
          // Use the files overrides below instead of allowDefaultProject
          // allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: process.cwd(),
      },
    },

  },

  {
    name: '--- base overrides',
    rules: {

      'camelcase'                     : ['off'],
      'class-methods-use-this'        : ['off'],
      'consistent-return'             : ['off'],
      'key-spacing'                   : ['off'],
      'linebreak-style'               : ['off'],
      'max-len'                       : ['off'],
      'no-await-in-loop'              : ['off'],
      'no-multi-spaces'               : ['off'],
      'no-underscore-dangle'          : ['off'],
      'padded-blocks'                 : ['off'],
      'prefer-regex-literals'         : ['off'],
      'quote-props'                   : ['off', 'consistent-as-needed'],

      'brace-style'                   : ['error', 'stroustrup', { 'allowSingleLine': true }],
      'lines-between-class-members'   : ['error', 'always', { 'exceptAfterSingleLine': true }],
      'no-multiple-empty-lines'       : ['error', { 'max': 2, 'maxBOF': 1, 'maxEOF': 0 }],
      'no-param-reassign'             : ['error', { 'props': false }],
      'no-plusplus'                   : ['error', { 'allowForLoopAfterthoughts': true }],
      // 'no-sync'                       : ['error'],
      'no-void'                       : ['error', { 'allowAsStatement': true }],
      'object-curly-newline'          : ['error', { 'consistent': true }],
      // 'switch-colon-spacing'          : ['error', { 'after': true, 'before': true }],
      'template-tag-spacing'          : ['error', 'always'],

      // Prefer typescript extended rules over default eslint rules
      // https://typescript-eslint.io/rules/dot-notation/
      // https://typescript-eslint.io/rules/no-unused-vars/
      'dot-notation'                                      : ['off'],
      'no-unused-vars'                                    : ['off'],
      '@typescript-eslint/dot-notation'                   : ['error'],
      '@typescript-eslint/no-unused-vars'                 : ['warn', { 'caughtErrors': 'none', 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/no-deprecated'                  : ['warn'],

      // '@typescript-eslint/consistent-type-definitions'    : ['error', 'type'],  // prefer type, but change this if we need extensible interfaces later
      // '@typescript-eslint/no-explicit-any'                : ['off'],
      '@typescript-eslint/no-extraneous-class'            : ['off'],
      '@typescript-eslint/no-namespace'                   : ['off'],
      '@typescript-eslint/no-redundant-type-constituents' : ['off'],
      '@typescript-eslint/no-unnecessary-condition'       : ['off'],
      '@typescript-eslint/prefer-regexp-exec'             : ['off'],
      '@typescript-eslint/restrict-template-expressions'  : ['off'],

      'import/newline-after-import'       : ['error', { 'count': 2 }],
      'import/no-extraneous-dependencies' : ['error', { 'devDependencies': true }],
      'import/no-relative-packages'       : ['off'],
      'import/no-useless-path-segments'   : ['off'],
      'import/prefer-default-export'      : ['off'],

      // Recommended by https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import
      'import/named'                      : ['off'],
      'import/namespace'                  : ['off'],
      'import/default'                    : ['off'],
      'import/no-named-as-default-member' : ['error'],  // was "off"
      'import/no-unresolved'              : ['off'],
      'import/extensions'                 : ['off'],
      'import/export'                     : ['error'],  // recommended warn
      'import/no-named-as-default'        : ['error'],  // recommended warn
      'import/no-deprecated'              : ['warn'],
      'import/no-duplicates'              : ['error'],

      // https://github.com/DataDog/browser-sdk/blob/main/eslint.config.mjs
      'import/no-cycle'                             : ['error'],
      '@typescript-eslint/consistent-type-imports'  : ['error'],

      'import/order': ['error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type', 'unknown'],
          // 'distinctGroup': true,
          'alphabetize': {
            // order: 'asc',
            // orderImportKind: 'asc',  // asc|desc|ignore
            'caseInsensitive': true,
          },
          'warnOnUnassignedImports': false,
        },
      ],

      'indent': ['error', 2, {
        'SwitchCase': 1,
        'VariableDeclarator': 1,
        'outerIIFEBody': 1,
        'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
        'FunctionExpression': { 'parameters': 1, 'body': 1 },
        'CallExpression': { 'arguments': 1 },
        'ArrayExpression': 1,
        'ObjectExpression': 1,
        'ImportDeclaration': 1,
        'flatTernaryExpressions': false,
        'ignoreComments': true,             // updated
        'offsetTernaryExpressions': false,
      }],

      'no-restricted-globals': ['warn', {
        name        : 'Date',
        message     : 'Use Temporal instead.',
      }],
      'no-restricted-syntax': ['error',
        {
          selector  : 'ForInStatement',
          message   : 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
          selector  : 'LabeledStatement',
          message   : 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          selector  : 'WithStatement',
          message   : '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
        {
          // eslint-disable-next-line no-restricted-syntax
          selector  : 'Literal[value=/[“”‘’]/], TemplateElement[value.raw=/[“”‘’]/]',
          message   : 'Use dumb quotes instead of smart quotes in strings.',
        },
      ],

      // 'prefer-destructuring': ['off'],
      'prefer-destructuring': ['off',
        {
          'AssignmentExpression'  : { 'array': false, 'object': false },
          'VariableDeclarator'    : { 'array': false, 'object': true  },
        },
        {
          'enforceForRenamedProperties': false,
        },
      ],

    },
  },

  {
    name    : '--- disableTypeChecked for config files',
    files   : ['.eslint*.*js', 'eslint*.*js', 'esbuild.mjs'],
    extends : [tseslint.configs.disableTypeChecked],
    rules   : {
      // 'unicorn/prefer-module'             : ['off'],
    },
  },
  {
    name    : '--- disable unused vars for *.types.ts',
    files   : ['**/*.types.ts'],
    rules   : {
      '@typescript-eslint/no-unused-vars' : ['off'],
    },
  },
  {
    name    : '--- relax lint rules for *.test.ts',
    files   : ['**/*.test.ts'],
    rules   : {
      'unicorn/prefer-module'             : ['off'],
    },
  },
  {
    name    : '--- no-undef for TS files',
    files   : ['**/*.ts', '**/*.tsx'],
    rules   : {
      'no-undef': ['off'],
    },
  },
  {
    name: '--- final overrides',
    rules: {},
  },

);
