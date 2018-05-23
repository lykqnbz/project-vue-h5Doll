const getters = {
  APPID: state => state.user.APPID,
  TOKEN:state => state.user.TOKEN,
  userInfo:state => state.user.userInfo,
  bgMusic:state=>state.user.bgMusic,
  successMusic:state=>state.user.successMusic,
  grabUpMusic: state => state.user.grabUpMusic,
  grabDownMusic: state => state.user.grabDownMusic,
  failMusic:state=>state.user.failMusic,
  loadIndex:state=>state.user.loadIndex,
  commanderUrl:state=>state.user.commanderUrl,
  scrollTop:state => state.user.scrollTop,
  errorGiftCoin:state => state.user.errorGiftCoin,
  errorDate:state => state.user.errorDate,
  showActivityHint:state => state.user.showActivityHint,
  activityDollImg:state => state.user.activityDollImg,
};
export default getters
