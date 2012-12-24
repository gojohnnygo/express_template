module.exports = {
	server: {
		options: {
			bitwise: true,
			camelcase: false,
			curly: true,
			eqeqeq: true,
			forin: true,
			immed: true,
			indent: 2,
			latedef: true,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			quotmark: "double",
			undef: true,
			unused: true,
			trailing: true,
			scripturl: true,
			strict: false,
			white: false,
			node: true
		}
	},
	browser: {
		globals: {
			require: true,
			define: true
		},
		options: {
			bitwise: true,
			camelcase: false,
			curly: true,
			eqeqeq: true,
			forin: true,
			immed: true,
			indent: 2,
			latedef: true,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			quotmark: "double",
			undef: true,
			unused: true,
			trailing: true,
			scripturl: true,
			strict: false,
			white: false,
			browser: true
		}
	}
};
