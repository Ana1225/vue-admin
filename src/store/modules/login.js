const login = {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    login(content, data) {
      return new Promise((resolve, reject) => {
        Login(data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
export default login;
