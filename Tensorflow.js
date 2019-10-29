const use = require("@tensorflow-models/universal-sentence-encoder");
const tf = require("@tensorflow/tfjs");


const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [4], units: 100 }));
model.add(tf.layers.dense({ units: 4 }));
model.compile({ loss: "categoricalCrossentropy", optimizer: "sgd" });

// const sentences = [
// 	"Being born was the worst moment of my life", "life my of moment worst the was born Being", "Is that some spaghetti?",
// 	"I like my phone.", "Your cellphone looks great.", "How old are you?",
// 	"What is your age?", "An apple a day, keeps the doctors away.",
// 	"Eating strawberries is healthy."
// ];

const sentences = [
	"Sitting in the sand at the beach", "Water is wet", "Swimming in the ocean"
]

const init = async () => {
	const model = await use.load();

	const embeddings = await model.embed(sentences);


	for (let i = 0; i < sentences.length; i++) {
		for (let j = i; j < sentences.length; j++) {
			const sentenceI = embeddings.slice([i, 0], [1]);
			const sentenceJ = embeddings.slice([j, 0], [1]);
			const sentenceITranspose = false;
			const sentenceJTransepose = true;
			const score =
				sentenceI.matMul(sentenceJ, sentenceITranspose, sentenceJTransepose)
					.dataSync();

			console.log("score: " + score + ", sen: " + i + ", with: " + j);
		}
		console.log("===================================");
	}
};
init();


