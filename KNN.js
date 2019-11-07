const { knn } = require("unsupervised-knn-js");
const use = require("@tensorflow-models/universal-sentence-encoder");
const hashtags =  [
	[ "offcourse", "learning", "serverless", "platform", "sxsw" ],
	[ "sri", "lanka", "march", "ella", "srilanka" ],
	[ "black", "amp", "walid", "ahmed", "bijlmerparkth" ],
	[ "cool", "design", "ah", "amsterdam", "nice" ],
	[ "lol", "day", "feel", "jarelrb", "people" ],
	[ "andrew", "heaton", "chrisgpackham", "amp", "georgemonbiot" ],
	[ "percolator", "hnj", "nlrebellion", "xr", "mkeulemans" ],
	[ "people", "lmao", "redlightvoices", "don", "imagine" ],
	[ "huwlemmey", "badgayspod", "week", "people", "letter" ],
	[ "antiknow", "antihist", "flattimeho", "pm", "madness" ],
	[ "amp", "gentcarl", "omg", "black", "ve" ]
];

const test = [ "offcourse", "learning", "serverless", "platform", "sxsw" ];

async function encode(arr){
	const tokenizer = await use.loadTokenizer();
	const encoded = await tokenizer.encode(arr);
	return encoded;
}

const createNeighborList = async (arr) => {
	const vector = await encode(arr);
	const result = { label : arr, vector };
	return result;
};

Promise.all(test.map(createNeighborList)).then(function(value){
	console.log(value);
});

// const createNeighbors = async (row, label)  => {
// 	const rawVector = row.filter(word => word !== label);
// 	const vector = await encode(rawVector);
// 	const result = { label, vector }; 
// 	return result;
// };

// const createNeighborsRow = async (row) => {
// 	try {
// 		const labeledVectorRow = row.map(label => createNeighbors(row, label));
// 		const result = await Promise.all(labeledVectorRow);
// 		return result;
// 	} catch(e) {
// 		console.log(e);
// 	}
// };


//Promise.all(hashtags.map(createNeighborsRow)).then(console.log);

// const neighbors = [
// 	{ label: "some name", vector: [1, 2, 4, 5] },
// 	{ label: "name 2", vector: [14, 4, 13, 2] },
// 	{ label: "another name", vector: [4, 4, 4, 5, 6, 7] },
// ];
// const target = [1, 2, 3, 4];
// const algo = "mse";
// const k = 3;

// var result = knn(algo, k, neighbors, target);

// const encodeRow = row => Promise.all(row.map(encode));

// const encodeHashTags = async hashtags => {
// 	const encodedRows = await hashtags.map(encodeRow);
// 	return await Promise.all(encodedRows);
// };

// encodeHashTags(hashtags).then(console.log);
