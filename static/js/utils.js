function log(msg) {
	console.log(msg);
}

function logArgs(args) {
	args.forEach(function(ce) {
		log(ce);
	});
}