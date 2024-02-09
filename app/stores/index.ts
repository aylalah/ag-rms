import generalStore from './general.store';
import userStore from './user.store';

const useAppStore = {
  general: generalStore,
  user: userStore,
};

export default useAppStore;
