import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url : {},
    genres : {},
    genresByType : {}
}

const homeSlice = createSlice({
    name : 'home',
    initialState,
    reducers : {
        getApiConf : (state, action) => {
            state.url = action.payload
        },
        getGenres : (state, action) => {
            state.genres = action.payload;
        },
        getGenresByType : (state, action) => {
            state.genresByType = action.payload;
        }
    }
})

export const {getApiConf, getGenres  , getGenresByType} = homeSlice.actions;
export default homeSlice.reducer;