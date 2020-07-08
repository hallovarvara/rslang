const authSuccess = (newToken) => {
  localStorage.setItem('rslangToken', newToken);
};

const logout = () => {
  localStorage.removeItem('rslangToken');
  localStorage.removeItem('rslangUserId');
  localStorage.removeItem('refreshTokenDate');
};

const autoLogout = (time) => {
  console.log(time);
  setTimeout(() => {
    logout();
  }, time * 1000);
};

const autoLogin = async () => {
  const token = localStorage.getItem('rslangToken');
  const expData = new Date(localStorage.getItem('refreshTokenDate'));
  if (!token) {
    logout();
  } else if (expData <= new Date()) {
    logout();
  } else {
    authSuccess(token);
    autoLogout((expData.getTime() - new Date().getTime()) / 1000);
  }
};

export default autoLogin;
