import types from '../actions/actionTypes'


export const uploaderPageNavigate= (page) => {
    return {
        type: types.UPLOADER_PAGE_CHANGE,
        page:page
    }
};
