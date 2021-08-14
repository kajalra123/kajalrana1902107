function paginate(array,currentpage,pagesize){
    let startIndex=currentpage*pagesize;
    let endIndex=startIndex+pagesize;
    return array.slice(startIndex,endIndex)
}
export{paginate};