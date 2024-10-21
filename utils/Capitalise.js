module.exports = function Capitalise(v) {
    
    return v.split('').map((char, i, arr)=>{
        if(i==0){
            return char.toUpperCase()
        }
        if(char == " "){
            const nextChar = arr.splice(i+1, 1).join('').toUpperCase()
            return char + nextChar
        }
        return char.toLowerCase()
    }).join('')
}