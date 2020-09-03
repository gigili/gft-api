const db = require("../db");
const helper = require("../../../helpers/helper");

const restaurant = {
	async list(startLimit = 0, endLimit = process.env.PER_PAGE) {
		const restaurants = await db.getResultSet(`SELECT * FROM ${db.getTables().Restaurant} LIMIT ${startLimit},${endLimit}`);
		const count = await db.getResultSet(`SELECT COUNT(id) as cnt FROM ${db.getTables().Restaurant}`, false, true);
		
		return {
			"success": (restaurants.success && restaurants.success),
			"restaurants": restaurants.rows,
			"total": count.rows["cnt"] || 0
		}
	},

	create(data = {}) {
		const name = data.name;
		let address = data.address || null;
		let city = data.city || null;
		let phone = data.phone || null;
		const delivery = data.delivery || "0";
		const geo_lat = parseFloat(data.geo_lat) || null;
		const geo_long = parseFloat(data.geo_long) || null;

		if (address !== null) {
			address = `'${address}'`;
		}

		if (city !== null) {
			city = `'${city}'`;
		}

		if (phone !== null) {
			phone = `'${phone}'`;
		}

		const insertQuery = `
			INSERT INTO ${db.getTables().Restaurant} (name, address, city, phone, delivery, geo_lat, geo_long)
			VALUES('${name}', ${address}, ${city}, ${phone}, '${delivery}', ${geo_lat}, ${geo_long});
		`;

		return db.getResultSet(insertQuery);
	},

	get(restaurantID = 0) {
		const query = `SELECT * FROM ${db.getTables().Restaurant} WHERE id = ${restaurantID}`;
		return db.getResultSet(query, false, true);
	},

	update(data = {}) {
		const id = data.restaurantID || null;
		const name = data.name;
		let address = data.address || null;
		let city = data.city || null;
		let phone = data.phone || null;
		const delivery = data.delivery || "0";
		const geo_lat = parseFloat(data.geo_lat) || null;
		const geo_long = parseFloat(data.geo_long) || null;

		if (id === null || id < 1) {
			return helper.invalid_response("Missing ID field");
		}

		if (address !== null) {
			address = `'${address}'`;
		}

		if (city !== null) {
			city = `'${city}'`;
		}

		if (phone !== null) {
			phone = `'${phone}'`;
		}

		const updateQuery = `
			UPDATE ${db.getTables().Restaurant} 
			SET
				name = '${name}', 
				address = ${address}, 
				city = ${city}, 
				phone = ${phone}, 
				delivery = '${delivery.toString()}', 
				geo_lat = ${geo_lat}, 
				geo_long = ${geo_long}
			WHERE id = ${id};
		`;

		return db.getResultSet(updateQuery);
	},

	delete(id = 0) {
		const deleteQuery = `DELETE FROM ${db.getTables().Restaurant} WHERE id = ${id}`;
		return db.getResultSet(deleteQuery);
	}
}

module.exports = restaurant;