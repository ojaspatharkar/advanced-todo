import { action, configure, makeObservable, observable, runInAction } from "mobx";

configure({
    enforceActions: 'always'
})

class PostsStore {
    posts = []
    constructor() {
        makeObservable(this, {
            posts: observable,
            getPosts : action,
            deletePost : action
        })
        this.getPosts()
    }

    async getPosts() {
        let posts = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
        runInAction(() => {
            this.posts = posts
        })
    }

    deletePost(id){
        this.posts = this.posts.filter(p => p.id != id)
    }

}

let store = new PostsStore()

export default store;