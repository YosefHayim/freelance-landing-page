export const removeUserActivation = () => {
  Reflect.deleteProperty(Navigator.prototype, 'userActivation');
};
