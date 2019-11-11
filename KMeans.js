const kmeans = require("node-kmeans");
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

// async function encode(arr){
// 	const tokenizer = await use.loadTokenizer();
// 	const encoded = await tokenizer.encode(arr);
// 	return encoded;
// }

const data = [
	{"company": "Microsoft" , "size": 91259, "revenue": 60420},
	{"company": "IBM" , "size": 400000, "revenue": 98787},
	{"company": "Skype" , "size": 700, "revenue": 716},
	{"company": "SAP" , "size": 48000, "revenue": 11567},
	{"company": "Yahoo!" , "size": 14000 , "revenue": 6426},
	{"company": "eBay" , "size": 15000, "revenue": 8700},
];
   
function evaluate(data, target) {
	let vectors = new Array();
	for (let i = 0 ; i < data.length ; i++) {
		vectors[i] = [data[i]["size"] , data[i]["revenue"]];
	}
    
	//Add target to end of vector
	vectors.push([target["size"], target["revenue"]]);
    
	let clusterIndex = -1;
    
	kmeans.clusterize(vectors, {k: 3}, (err,res) => {
		if (err) {
			console.error(err);
		} 
		else {
			console.log("%o", res);
			
			for (var i = 0; i < res.length; i++){
				//console.log(res[i].clusterInd);
				if (res[i].clusterInd.includes(data.length)){
					clusterIndex = i;
				}
			}
			console.log(target.company + " is in cluster# : " + clusterIndex);
			console.log(res[clusterIndex].clusterInd);
            
			console.log(target.company + " is clustered with: ");
			for (var j = 0; j < res[clusterIndex].clusterInd.length; j++){
				console.log(data[res[clusterIndex].clusterInd[j]]);
			}
		}
	});
}

evaluate(data, {"company": "HvA", "size": 9000, "revenue": 1200});