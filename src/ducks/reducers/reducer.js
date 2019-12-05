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

export function updateUserOnReduxState(newUserObject){
    return {
        type: UPDATE_USER_ON_REDUX_STATE, 
        payload: newUserObject
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

        default: 
            return state
    }
}