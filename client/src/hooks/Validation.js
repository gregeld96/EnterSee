import React from 'react'

function FormValidation (input) {
    let error = []
    
    function isValidURL(string) {
        var res = string.match(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
        return (res !== null)
    };
    
    const url = isValidURL(input.poster_path)
    
    if(!input.title){
        error.push('Please fill up the title')
    }
    if(!input.overview){
        error.push('Please fill up the overview')
    }
    if(isNaN(input.popularity) || !input.popularity || input.popularity > 10){
        error.push('Fill up with the correct rating format')
    }
    if(input.tags.length === 0){
        error.push('Fill up with the tags')
    }
    if(!url){
        error.push('Please use the the correct url format')
    }

    return error
}

export default FormValidation