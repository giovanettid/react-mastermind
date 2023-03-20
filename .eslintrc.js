module.exports = {
  extends: 'airbnb',
  globals: {
    document: false,
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  plugins: ['import', 'react', 'react-hooks', 'jsx-a11y', 'jest'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src', 'test/unit', 'test/e2e'],
      },
    },
  },
};
