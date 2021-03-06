var stopwords = {"a":true,"about":true,"above":true,"across":true,"after":true,"afterwards":true,"again":true,"against":true,"all":true,"almost":true,"alone":true,"along":true,"already":true,"also":true,"although":true,"always":true,"am":true,"among":true,"amongst":true,"amoungst":true,"amount":true,"an":true,"and":true,"another":true,"any":true,"anyhow":true,"anyone":true,"anything":true,"anyway":true,"anywhere":true,"are":true,"around":true,"as":true,"at":true,"back":true,"be":true,"became":true,"because":true,"become":true,"becomes":true,"becoming":true,"been":true,"before":true,"beforehand":true,"behind":true,"being":true,"below":true,"beside":true,"besides":true,"between":true,"beyond":true,"bill":true,"both":true,"bottom":true,"but":true,"by":true,"call":true,"can":true,"cannot":true,"cant":true,"co":true,"con":true,"could":true,"couldnt":true,"cry":true,"de":true,"describe":true,"detail":true,"do":true,"done":true,"down":true,"due":true,"during":true,"each":true,"eg":true,"eight":true,"either":true,"eleven":true,"else":true,"elsewhere":true,"empty":true,"enough":true,"etc":true,"even":true,"ever":true,"every":true,"everyone":true,"everything":true,"everywhere":true,"except":true,"few":true,"fifteen":true,"fify":true,"fill":true,"find":true,"fire":true,"first":true,"five":true,"for":true,"former":true,"formerly":true,"forty":true,"found":true,"four":true,"from":true,"front":true,"full":true,"further":true,"get":true,"give":true,"go":true,"had":true,"has":true,"hasnt":true,"have":true,"he":true,"hence":true,"her":true,"here":true,"hereafter":true,"hereby":true,"herein":true,"hereupon":true,"hers":true,"herself":true,"him":true,"himself":true,"his":true,"how":true,"however":true,"hundred":true,"ie":true,"if":true,"in":true,"inc":true,"indeed":true,"interest":true,"into":true,"is":true,"it":true,"its":true,"itself":true,"keep":true,"last":true,"latter":true,"latterly":true,"least":true,"less":true,"ltd":true,"made":true,"many":true,"may":true,"me":true,"meanwhile":true,"might":true,"mill":true,"mine":true,"more":true,"moreover":true,"most":true,"mostly":true,"move":true,"much":true,"must":true,"my":true,"myself":true,"name":true,"namely":true,"neither":true,"never":true,"nevertheless":true,"next":true,"nine":true,"no":true,"nobody":true,"none":true,"noone":true,"nor":true,"not":true,"nothing":true,"now":true,"nowhere":true,"of":true,"off":true,"often":true,"on":true,"once":true,"one":true,"only":true,"onto":true,"or":true,"other":true,"others":true,"otherwise":true,"our":true,"ours":true,"ourselves":true,"out":true,"over":true,"own":true,"part":true,"per":true,"perhaps":true,"please":true,"put":true,"rather":true,"re":true,"same":true,"see":true,"seem":true,"seemed":true,"seeming":true,"seems":true,"serious":true,"several":true,"she":true,"should":true,"show":true,"side":true,"since":true,"sincere":true,"six":true,"sixty":true,"so":true,"some":true,"somehow":true,"someone":true,"something":true,"sometime":true,"sometimes":true,"somewhere":true,"still":true,"such":true,"system":true,"take":true,"ten":true,"than":true,"that":true,"the":true,"their":true,"them":true,"themselves":true,"then":true,"thence":true,"there":true,"thereafter":true,"thereby":true,"therefore":true,"therein":true,"thereupon":true,"these":true,"they":true,"thickv":true,"thin":true,"third":true,"this":true,"those":true,"though":true,"three":true,"through":true,"throughout":true,"thru":true,"thus":true,"to":true,"together":true,"too":true,"top":true,"toward":true,"towards":true,"twelve":true,"twenty":true,"two":true,"un":true,"under":true,"until":true,"up":true,"upon":true,"us":true,"very":true,"via":true,"was":true,"we":true,"well":true,"were":true,"what":true,"whatever":true,"when":true,"whence":true,"whenever":true,"where":true,"whereafter":true,"whereas":true,"whereby":true,"wherein":true,"whereupon":true,"wherever":true,"whether":true,"which":true,"while":true,"whither":true,"who":true,"whoever":true,"whole":true,"whom":true,"whose":true,"why":true,"will":true,"with":true,"within":true,"without":true,"would":true,"yet":true,"you":true,"your":true,"yours":true,"yourself":true,"yourselves":true,"i":true};

var pos = require('pos');
var tagger = new pos.Tagger();

function tokenize(original) {
	try {

		var s = original.substr();

		s = s.replace('\t',' '); // tab spaces
		s = s.replace(/[-_(),&.]/g,' '); // special characters
		s = s.replace(/[^A-Za-z ]/g,''); // non alphabets
		s = s.replace(/\s\s+/g,' '); // multiple spaces

		s = s.split(' ');

		if(s[0]=='') s.splice(0,1);
		if(s[s.length-1]=='') s.pop();

		return s;

	} catch (error) {
		return [];
	}
}

function withoutStopwords(words) {
	var words_len = words.length;
	var wordObject = {};
	var w_lower;
	for(var i=0 ; i<words_len ; i++) {
		w_lower = words[i].toLowerCase();
		if(!stopwords[w_lower]){
			if(!wordObject[w_lower]){
				wordObject[w_lower] = {
					word: words[i],
					frequency: 0
				};
			}
			wordObject[w_lower].frequency++;
		}
	}

	return wordObject;
}

function withStopwords(words) {
	var words_len = words.length;
	var wordObject = {};
	var w_lower;
	for(var i=0 ; i<words_len ; i++) {
		w_lower = words[i].toLowerCase();
		if(!wordObject[w_lower]){
			wordObject[w_lower] = {
				word: words[i],
				frequency: 0
			};
		}
		wordObject[w_lower].frequency++;
	}

	return wordObject;
}

function getSortedArray(wordObject) {

	var reducedArray = Object.keys(wordObject).map(function(k){
		return wordObject[k];
	});

	reducedArray.sort(function(a,b){
		if( a.frequency < b.frequency ) return 1;
		else if( a.frequency > b.frequency ) return -1;
		else return 0
	});

	return reducedArray;

}

function getUniqueWords(reducedArray) {
	return reducedArray.map(function(val){
		return val.word;
	});
}

function getWordTags(reducedArray) {
	return tagger.tag( getUniqueWords(reducedArray) );
}

function getNouns(reducedArray) {
	var wordTag = getWordTags(reducedArray);
	var nouns = [];
	for(var i in wordTag){
		if(wordTag[i][1].substr(0,2) == "NN"){
			nouns.push(wordTag[i][0]);
		}
	}
	return nouns;
}

function getProperNouns(reducedArray) {
	var wordTag = getWordTags(reducedArray);
	var pNouns = [];			
	for(var i in wordTag){
		if(wordTag[i][1].substr(0,3) == "NNP"){
			pNouns.push(wordTag[i][0]);
		}
	}
	return pNouns;
}

function getNounsAndProperNouns(reducedArray) {
	var wordTag = getWordTags(reducedArray);
	var nouns = [];
	var pNouns = [];

	for(var i in wordTag){
				
		if(wordTag[i][1].substr(0,2) == "NN"){
			nouns.push(wordTag[i][0]);
		}

		if(wordTag[i][1].substr(0,3) == "NNP"){
			pNouns.push(wordTag[i][0]);
		}
				
	}

	return {
		nouns: nouns,
		properNouns: pNouns
	};
	
}

module.exports.parse = function parse(data,callback) {

	try {
		var result;
		if(!data || !data.str) { // #anchor1#
			result = null;
		} else {

			result = {};

			var words = tokenize(data.str); // #anchor2#
			var wordObject;

			// getting unique words with frequency
			if(data.stopwords=="false"){ // #anchor4#
				// without stopwords
				wordObject = withoutStopwords(words);
			} else {
				// with stopwords
				wordObject = withStopwords(words);
			}
			
			// sorted array of words with frequency
			var reducedArray = getSortedArray(wordObject);
			var limit = Number(data.limit) || reducedArray.length; // #anchor5#
			result.frequencies = reducedArray.slice(0,limit);

			// nouns
			if(data.nouns!="false"){ // #anchor7#
				// requested for nouns
				if(data.properNouns=="true"){ // #anchor7-1#
					
					var NN = getNounsAndProperNouns(reducedArray);
					result.nouns = NN.nouns;
					result.properNouns = NN.properNouns;
				
				} else { // #anchor7-2#
					result.nouns = getNouns(reducedArray);
				}
			
			} else if(data.properNouns=="true"){ // #anchor8#
				// requested for proper nouns
				result.properNouns = getProperNouns(reducedArray);
			}

			// all tokens
			if(data.tokens=="true"){ // #anchor3#
				// tokens requested
				result.tokens = words;
			}

			// unique words
			if(data.uniqueWords=="true"){ // #anchor6#
				// requested for all unique words
				result.uniqueWords = getUniqueWords(reducedArray);
			}


			result = JSON.stringify(result);
		}

		callback(false,result);

	} catch (error) {
		callback(error,null);
	}

}
