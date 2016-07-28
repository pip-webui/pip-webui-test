module.exports = {
    module: {
        name: 'pipTest'
    },
    build: {
        js: true,
        ts: false,
        html: false,
        css: false,
        lib: true,
        images: true,
        dist: false
    },
    file: {
        lib: [
            '../pip-webui-test/dist/**/*',
            '../pip-webui-lib/dist/**/*',
            '../pip-webui-css/dist/**/*',
            '../pip-webui-core/dist/**/*',
             '../pip-webui-rest/dist/**/*',
            // '../pip-webui-controls/dist/**/*',
            '../pip-webui-nav/dist/**/*',
             '../pip-webui-layouts/dist/**/*'
            // '../pip-webui-pictures/dist/**/*',
            // '../pip-webui-locations/dist/**/*',
            // '../pip-webui-documents/dist/**/*',
            // '../pip-webui-composite/dist/**/*',
            // '../pip-webui-errors/dist/**/*',
            // '../pip-webui-entry/dist/**/*',
            // '../pip-webui-settings/dist/**/*',
            // '../pip-webui-guidance/dist/**/*',
            // '../pip-webui-support/dist/**/*',
            // '../pip-webui-help/dist/**/*'
        ]
    },
    samples: {
        port: 8010,
    },
    api: {
        port: 8011,
    },
  eslint: {
    "extends": "standard",
    "env"    : {
      "browser": true,
      "node"   : true,
      "mocha"  : true,
      "jasmine": true
    },
    "parserOptions": {
      "sourceType"  : "script",
      "ecmaFeatures": {}
    },
    "globals": {
      "_"      : true,
      "angular": true,
      "inject" : true,
      "sinon"  : true
    },
    "rules": {
      "no-console"       : 2,
      "no-dupe-keys"     : 2,
      "no-duplicate-case": 2,
      "no-empty"         : [2, { "allowEmptyCatch": true }],
      "no-extra-parens"  : [2, "all"],
      "no-extra-semi"    : 2,
      "no-extra-boolean-cast": 2,
      "no-inner-declarations": [2, "functions"],
      "no-unreachable"   : 2,
      "valid-typeof"     : 2,
      "complexity"       : [2, 10],
      "curly"            : [2, "all"],
      "guard-for-in"     : 1,
      "no-alert"         : 2,
      "no-else-return"   : 1,
      "no-empty-function": 2,
      "no-eq-null"       : 2,
      "no-extend-native" : 2,
      "no-labels"        : 2,
      "no-param-reassign": 2,
      "no-proto"         : 2,
      "no-throw-literal" : 2,
      "one-var"          : [2, "always"],
      "quote-props"      : [2, "as-needed"],
      "strict"           : [2, "function"],
      "wrap-iife"        : [2, "inside"],
      // Style rules
      "block-spacing": 2,
      "brace-style"  : 2,
      "camelcase"    : 2,
      "comma-style"  : [2, "last"],
      "eol-last"     : 2,
      "indent"       : [2, 4, { "SwitchCase": 1, "VariableDeclarator": 1 }],
      "linebreak-style": 2,
      "max-depth"      : [2, {"max": 6}],
      "max-len"        : [2, 120, 4, { "ignoreComments": true }],
      "newline-after-var"    : 2,     // ???
      "newline-before-return": 2, // ???
      "no-lonely-if"       : 2,
      "no-trailing-spaces" : 2,
      "no-unneeded-ternary": 2,
      "semi"               : [2, "always"],
      "padded-blocks"      : 0,
      "space-before-function-paren": ["error", { "anonymous": "always", "named": "never" }]
    }
  }
};
