/**
 * @param id:商品id,key:key值,value:id值
 * @returns
 */
export function saveToLocal(id, key, value) {
	let seller = window.localStorage.__seller__;
	// 第一次创建seller json数据
	if (!seller) {
		seller = {};
		seller[id] = {};
	} else {
		// 解析seller
		seller = JSON.parse(seller);
		// 是否收藏有当前商家
		if (!seller[id]) {
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	// 存储为json对象
	window.localStorage.__seller__ = JSON.stringify(seller);
};

/**
 * @param id:商品id,key:key值,def:默认值
 * @returns
 */
export function loadFromLocal(id, key, def) {
	let seller = window.localStorage.__seller__;
	// 有没有seller json对象
	if (!seller) {
		return def;
	}
	// 转换seller json对象
	seller = JSON.parse(seller)[id];
	// 有没有收藏该商家
	if (!seller) {
		return def;
	}
	let ret = seller[key];
	return ret || def;
};
