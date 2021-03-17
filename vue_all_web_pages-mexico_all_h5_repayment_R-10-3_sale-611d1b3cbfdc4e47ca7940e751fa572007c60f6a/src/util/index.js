/**
Created by dechuan on 2020/12/23 18
 */
export const parseUrl = () => {
	if (location.search.length < 1 && location.hash.length < 1 ) return false;
	let queryArr = '';
	let query = {};
	// if (location.search.length > 0) {
	// 	queryArr = location.search.substr(1).split('&');
	// }
	let hash = location.hash;
	if (hash.length > 2) {
		queryArr = hash.split('?')[1].split('&');
	}
	if (queryArr.length < 1 || queryArr[0].length < 1) return  false;

	for (let i = 0, len = queryArr.length; i < len; i++) {
		const key = queryArr[i].split('=')[0];
		const val = queryArr[i].split('=')[1];
		// todo 这段逻辑还要再看
		// if (query.hasOwnProperty(key)) {
		// 	if (!Array.isArray(query[key])) {
		// 		query[key] = [query[key]]
		// 		query[key].push(val)
		// 	} else {
		// 		query[key].push(val)
		// 	}
		// 	continue
		// }
		query[key] = val
	}
	return query
}

export const toThousands = number => {
	let num = (number ? number : (typeof(number) === 'number' ? number : '' )).toString();
	let result = '';
//判断是否带小数点
	if (num.split('.')[1]) {
		const numInt = num.split('.')[0],
			numFlo = num.split('.')[1];
		result = formatter(numInt) + '.' + numFlo
	} else {
		result = formatter(num);
	}
	return result;
}

//格式化整数
export const formatter = (numInt) => {
	let resultInt = '';
	while (numInt.length > 3) {
		resultInt = ',' + numInt.slice(-3) + resultInt;
		numInt = numInt.slice(0, numInt.length - 3);
	}
	if (numInt) {
		resultInt = numInt + resultInt;
	}
	return resultInt;
}