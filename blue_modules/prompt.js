import { Platform } from 'react-native';
import prompt from 'react-native-prompt-android';

module.exports = (title, text, isCancelable = true, type = 'secure-text', isOKDestructive = false) => {
  const keyboardType = type === 'numeric' ? 'numeric' : 'default';

  if (Platform.OS === 'ios' && type === 'numeric') {
    // `react-native-prompt-android` on ios does not support numeric input
    type = 'plain-text';
  }

  return new Promise((resolve, reject) => {
    const buttons = isCancelable
      ? [
          {
            text: 'Cancel',
            onPress: () => {
              reject(Error('Cancel Pressed'));
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: password => {
              resolve(password);
            },
            style: isOKDestructive ? 'destructive' : 'default',
          },
        ]
      : [
          {
            text: 'OK',
            onPress: password => {
              resolve(password);
            },
          },
        ];

    prompt(title, text, buttons, {
      type: type,
      cancelable: isCancelable,
      keyboardType,
    });
  });
};
