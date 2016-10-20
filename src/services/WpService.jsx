// import Request from './Request'
import WP from '../modules/wp/config'

class WpService {
  constructor(storeCallback) {
    this.storeCallback = storeCallback
  }
  fetchRecentPosts() {
    return {
      actionType: WP.GET_RECENT_POSTS.REQUESTED
    }
  }
  fetchPost(postSlug) {

  }
  fetchCategoryIndex(slug) {

  }
  fetchCategoryPosts(categorySlug) {

  }
  fetchPage(pageSlug) {

  }
}

export default WpService