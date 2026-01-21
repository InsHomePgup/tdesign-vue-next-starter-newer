import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: true,
    vue: true,
    jsonc: false,
    yaml: false,
    markdown: false,
    formatters: false,
    ignores: [
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },
  {
    rules: {
      'no-console': 'off',
      'style/no-tabs': 'off',
      'ts/no-use-before-define': 'off',
      'node/prefer-global/process': 'off',
      'vue/custom-event-name-casing': 'off',
      'antfu/top-level-function': 'off',
      'antfu/if-newline': 'off',
    },
  },
)
