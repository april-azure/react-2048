var Utils = Utils || {};

Utils.genRanInt = function(x,y) {
	return Math.round(Math.random()*(y-x) + x)
}

Utils.genDisRanIntWithin = function(arr) {
	let len = arr.length
	let random = Utils.genRanInt(0, len-1)
	return arr[random]
}

export default Utils