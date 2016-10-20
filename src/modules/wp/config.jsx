class ACTION {
  constructor(actionName) {
    this.actionName = actionName
  }
  get REQUESTED() {
    return this.actionName + '/REQUESTED'
  }
  get SUCCESS() {
    return this.actionName + '/SUCCESS'
  }
  get FAILED() {
    return this.actionName + '/FAILED'
  }
  get DEFAULT() {
    return this.actionName
  }
}

const ACTIONS = {
  GET_RECENT_POSTS: new ACTION('WP/GET_RECENT_POSTS'),
  GET_CATEGORY_INDEX: new ACTION('WP/GET_CATEGORY_INDEX'),
  GET_POST: new ACTION('WP/GET_POST'),
  GET_PAGE: new ACTION('WP/GET_PAGE'),
  GET_CATEGORY_POSTS: new ACTION('WP/GET_CATEGORY_POSTS'),
}

export default ACTIONS