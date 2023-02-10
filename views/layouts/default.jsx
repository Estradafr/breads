const React = require('react');

function Default(html) {
	return (
		<html>
			<head>
				<title>{html.title || 'BreadCRUD'}</title>
			</head>
			<body>
				<h1>Here's our bread!</h1>
				<div className="container">{html.children}</div>
			</body>
		</html>
	);
}

module.exports = Default;
