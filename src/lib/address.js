import address from './add.json'

function formatData(province) {
	var data = province ? address[province] : address;

	var result = [];
	for (var key in data) {
      	result.push({
        	value: key
      	});
    }
    return result;
}

export function provinceData() {
	return formatData();
}

export function cityData(province) {
	return formatData(province);
}
