import { HTTP } from '../utils/http'

class BookModel extends HTTP {
	getHotList () {
		return this.request({
			url: '/book/hot_list',
		})
	}

	getMyBookCount () {
		return this.request({
			url: '/book/favor/count',
		})
	}
}

export {
	BookModel
}