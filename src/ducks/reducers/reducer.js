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

const UPDATE_USER_ON_REDUX_STATE = "UPDATE_USER_ON_REDUX_STATE"
const UPDATE_CURRENT_PAGE_ON_REDUX_STATE = "UPDATE_CURRENT_PAGE_ON_REDUX_STATE"

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

export default function reducer (state = initialState, action){
    const {type, payload} = action
    switch(type){
        case UPDATE_USER_ON_REDUX_STATE: 
            return {
                ...state, 
                user: {
                    personId: payload.personId,
                    email: payload.email, 
                    username: payload.username, 
                    firstname: payload.firstname, 
                    lastname: payload.lastname, 
                    password: payload.password, 
                    profilePic: payload.profilePic
                }
            }

        case UPDATE_CURRENT_PAGE_ON_REDUX_STATE: 
            console.log('This is the payload: ', payload)
            return {
                ...state, 
                currentPage: {
                    pageId: payload.page_id, 
                    personId: payload.person_id, 
                    pageTitle: payload.page_title
                }
            }

        default: 
            return state
    }
}