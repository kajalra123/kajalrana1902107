function paginate(array,currentpage,pagesize){
    let startIndex=currentpage*pagesize;
    let endIndex=startIndex+pagesize;
    return array.slice(startIndex,endIndex)
}
function makearray(number){
    let array=[];
    for( let i=0 ;i<number;i++) array.push(i);
    return array;

}
function sorting(array, key, sortOrder) {
	//Validate data
	let sampleKeys = Object.keys(array[0]);
	let sampleData = array[0];
	if (!sampleKeys.includes(key)) throw new Error(`Key doesn't exits...`);
	if (!["asc", "desc"].includes(sortOrder))
		throw new Error("Invalid sort order");

	//sorting
	if (typeof sampleData[key] === "number") {
		array.sort((a, b) => {
			a = a[key];
			b = b[key];
			if (sortOrder === "asc") return a - b;
			if (sortOrder === "desc") return b - a;
			return 0;
		});
		return array;
	} else if (typeof sampleData[key] === "string") {
		array.sort((a, b) => {
			a = a[key].toLowerCase();
			b = b[key].toLowerCase();
			if (sortOrder === "asc") {
				if (a > b) return 1;
				if (a < b) return -1;
				return 0;
			} else if (sortOrder === "desc") {
				if (a > b) return -1;
				if (a < b) return 1;
				return 0;
			}
		});
		return array;
	}
}
export{paginate,makearray,sorting};