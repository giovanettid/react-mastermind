module.exports = {
  "extends": "airbnb",
  "globals": {
    "document": false
  },
  "plugins": [
    "import",
    "react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  settings: {
    "import/resolver": {
      "node" : {
        "moduleDirectory": ["node_modules", "src", "test/unit", "test/e2e"]
      }
    }
  }
};
