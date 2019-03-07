export const CHANGE_LOADING_BAR = "CHANGE_LOADING_BAR"
const loadQueue = []
export default {
    [CHANGE_LOADING_BAR](state , loadingBarState){
        if (loadingBarState) {
            loadQueue.push(true)
        } else {
            loadQueue.pop()
        }

        state.loading =  loadQueue.length > 0
    },
    setShowIndexLoadingBar(state , show){
        state.showIndexLoadingBar = show
    },
    setLoadingProgress(state , loadingProgress){
        state.loadingProgress = loadingProgress
    },
    setImages(state , images){
        state.images = images
    },
    setIsPlaying(state , isPlaying){
        state.isPlaying = isPlaying
    },
    setHead(state , head){
        state.head = head
    },
    setPreview(state , preview){
        state.preview = preview
    },
    setIsShare(state , isShare){
        state.isShare = isShare
    },
    setOpenid(state , openid){
        state.openid = openid
    }
}
