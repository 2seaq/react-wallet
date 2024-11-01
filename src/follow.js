module.exports = function follow(api, rootPath, relArray) {
	const root = api({
		method: 'GET',
		path: rootPath
	});
	
	console.log("App - Follow Function - root const " + root);
	console.log("App - Follow Function - rootPath const " + rootPath);
	
	return relArray.reduce(function(root, arrayItem) {
		const rel = typeof arrayItem === 'string' ? arrayItem : arrayItem.rel;
    	console.log("App - Follow Function - rel const " + rel);
		return traverseNext(root, rel, arrayItem);
	}, root);

	function traverseNext (root, rel, arrayItem) {
    	console.log("App - Follow Function traverseNext - root " + root);		
    	console.log("App - Follow Function traverseNext - rel  " + rel);			
    	console.log("App - Follow Function traverseNext - arrayItem  " + arrayItem);	
    			
		return root.then(function (response) {
			    	console.log("App - Follow Function traverseNext - response.entity " + response.entity);
			
			if (hasEmbeddedRel(response.entity, rel)) {
					    console.log("App - Follow Function Tranverse A ");
				return response.entity._embedded[rel];
			}

			if(!response.entity._links) {
 			    console.log("App - Follow Function Tranverse B ");
				return [];
			}

			if (typeof arrayItem === 'string') {
			    console.log("App - Follow Function Tranverse C ");
				return api({
					method: 'GET',
					path: response.entity._links[rel].href
				});
			} else {
			    console.log("App - Follow Function Tranverse D " + arrayItem.params[0]);
				return api({
					method: 'GET',
					path: response.entity._links[rel].href,
					params: arrayItem.params
				});
			}
		});
	}

	function hasEmbeddedRel (entity, rel) {
		return entity._embedded && entity._embedded.hasOwnProperty(rel);
	}
};
