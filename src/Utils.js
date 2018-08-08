var Utils = Utils || {};

Utils.genRanInt = function(x,y) {
	return Math.round(Math.random()*(y-x) + x)
}

Utils.genDisRanIntWithin = function(arr) {
	let len = arr.length
	let random = Utils.genRanInt(0, len-1)
	return arr[random]
}

Utils.generateId = function() {
	return '_' + Math.random().toString(36).substr(2, 9);
}


export default Utils