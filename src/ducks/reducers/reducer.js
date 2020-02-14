const initialState = {
    user: {/*
        personId, 
        email, 
        username, 
        firstname, 
        lastname, 
        password, 
        profilePic
    */}, 
    pagesOnCurrentProfile: [],
    currentPage: {/* 
        pageId, 
        personId, 
        pageTitle 
    */}, 
    postsOnCurrentPage: [/* 
        {
        postId, 
        personId, 
        pageId, 
        postText, 
        postPhoto, 
        date
    }, {
        postId, 
        personId, 
        pageId, 
        postText, 
        postPhoto, 
        date
    }, etc. 
    */]
}

const GET_REDUX_STATE = "GET_REDUX_STATE"
const UPDATE_USER_ON_REDUX_STATE = "UPDATE_USER_ON_REDUX_STATE"
const UPDATE_CURRENT_PAGE_ON_REDUX_STATE = "UPDATE_CURRENT_PAGE_ON_REDUX_STATE"
const UPDATE_POSTS_ON_CURRENT_PAGE_ON_REDUX_STATE = "UPDATE_POSTS_ON_CURRENT_PAGE_ON_REDUX_STATE"
const ADD_NEW_POST = "ADD_NEW_POST"

export function getReduxState(){
    return {
        type: GET_REDUX_STATE
    }
}

export function updateUserOnReduxState(updatedUserObject){
    return {
        type: UPDATE_USER_ON_REDUX_STATE, 
        payload: updatedUserObject
    }
}

export function updateCurrentPageOnReduxState(updatedCurrentPage){
    return {
        type: UPDATE_CURRENT_PAGE_ON_REDUX_STATE, 
        payload: updatedCurrentPage
    }
}

export function updatePostsOnCurrentPageOnReduxState(postsOnCurrentPage){
    return {
        type: UPDATE_POSTS_ON_CURRENT_PAGE_ON_REDUX_STATE, 
        payload: postsOnCurrentPage
    }
}

export function addNewPost(newPost){
    return {
        type: ADD_NEW_POST, 
        payload: newPost
    }
}

export default function reducer (state = initialState, action){
    const {type, payload} = action
    switch(type){
        case GET_REDUX_STATE: 
            return {
                ...state
            }

        case UPDATE_USER_ON_REDUX_STATE: 
            return {
                ...state, 
                user: {
                    personId: payload.person_id,
                    email: payload.email, 
                    username: payload.username, 
                    firstname: payload.firstname, 
                    lastname: payload.lastname, 
                    password: payload.password, 
                    profilePic: payload.profile_pic
                }
            }

        case UPDATE_CURRENT_PAGE_ON_REDUX_STATE: 
        console.log('this is the payload for reducer.UPDATE_CURRENT_PAGE...: ', payload)
            return {
                ...state, 
                currentPage: {
                    pageId: payload.page_id, 
                    personId: payload.person_id, 
                    pageTitle: payload.page_title/*
                    isLanding: payload.is_landing (which would be true or false)*/
                }
            }

        case UPDATE_POSTS_ON_CURRENT_PAGE_ON_REDUX_STATE: 
        console.log('this is the payload for reducer.UPDATE_POSTS_ON_CURRENT...: ', payload)
            return {
                ...state, 
                postsOnCurrentPage: [
                    ...payload
                ]
            }

        case ADD_NEW_POST: 
            return {
                ...state, 
                postsOnCurrentPage: [
                    {
                        postId: payload.post_id, 
                        personId: payload.person_id, 
                        pageId: payload.page_id, 
                        postText: payload.post_text, 
                        postPhoto: payload.post_photo
                    }, 
                    ...state.postsOnCurrentPage
                ]
            }

        default: 
            return state
    }
}