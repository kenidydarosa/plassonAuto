module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      'react-native-paper/babel', // Se for necessário em desenvolvimento também
      'react-native-reanimated/plugin', // Deve ser o último plugin
    ],
  };
};
