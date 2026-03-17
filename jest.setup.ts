import '@testing-library/jest-native/extend-expect';

jest.spyOn(console, 'warn').mockImplementation(() => { });
jest.spyOn(console, 'error').mockImplementation((msg: string) => {
  if (
    typeof msg === 'string' &&
    (msg.includes('Warning:') || msg.includes('ReactDOM.render'))
  ) {
    return;
  }
  console.error(msg);
});
