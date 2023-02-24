const React = require('react');
const Default = require('./layouts/Default');

function Show({baker}) {
	return (
		<Default>
			<h2>{baker.name}</h2>
			<p>
				{baker.name} has been baking with us since{' '}
				{baker.startDate.getFullYear()}
			</p>
			<p>
				<b>About {baker.name}</b>: {baker.bio}
			</p>
			<h3>Here are some of the breads {baker.name} has baked:</h3>
			<ul>
				{baker.breads.map((bread) => {
					return <li key={bread.id}>{bread.name}</li>;
				})}
			</ul>
		</Default>
	);
}

module.exports = Show;
