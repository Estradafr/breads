const React = require('react');
const Default = require('./layouts/Default');

function Edit({bread}) {
	return (
		<Default>
			<h2>Edit a bread</h2>
			<form
				action={`/breads/${bread._id}?_method=PUT`}
				method="POST"
			>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					id="name"
					defaultValue={bread.name}
					required
				/>
				<label htmlFor="image">Image</label>
				<input
					type="text"
					name="image"
					id="image"
					defaultValue={bread.image}
				/>
				<label htmlFor="hasGluten">Has Gluten?</label>
				<input
					type="checkbox"
					name="hasGluten"
					id="hasGluten"
					defaultChecked={bread.hasGluten}
				/>
				<br />
				<input type="submit" />
				<label htmlFor="baker">Baker</label>
				<select
					name="baker"
					id="baker"
				>
					<option value="Spiderman">Spiderman</option>
					<option value="Iron-Man">Iron-Man</option>
					<option value="Captain America">Captain America</option>
					<option value="Thor">Thor</option>
					<option value="Hulk">Hulk</option>
					<option value="Black Panther">Black Panther</option>
				</select>
			</form>
		</Default>
	);
}

module.exports = Edit;
