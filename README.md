# parser

```bash
$ git clone https://github.com/thecodesome/parser.git
$ cd parser/
$ npm install
$ npm start
```
Note: You can set server port in `app.js`. Default is `3000`

### About API

#### Request route: `/parse`
* Example `http://localhost:3000/parse`

#### Request parameters
* `str`: the string to be parsed

* `stopwords`: "true" or "false"
  * Set it to `false` to ignore stopwords.
  * Default:`true`.
  * [Click here](https://github.com/thecodesome/parser/blob/master/docs/stopwords.md) to see the words considered as stopwords in this API

* `limit`: Number
  * Limit on number of words with frequency to receive.
  * Default: All the words

* `nouns`: "true" or "false"
  * Set it to `false` for not to receive nouns.
  * Default: `true`

* `properNouns`: "true" or "false"
  * Set it to `true` to get proper nouns.
  * Default: `false`
  
* `tokens`: "true" or "false"
  * Set it to `true` to get all the tokens in `str`.
  * Default:`false`

* `uniqueWords`: "true" or "false"
  * Set it to `true` to get all the unique words in `str`.
  * Default: `false`



#### Example request patterns

```
http://localhost:3000/parse?str=Hello%20World

http://localhost:3000/parse?str=I%20am%20one%20sentence.%20And%2C%20I%20am%20another%20sentence

http://localhost:3000/parse?str=This%20is%20parser&stopwords=false

http://localhost:3000/parse?str=This%20is%20parser&tokens=true

http://localhost:3000/parse?str=This%20is%20parser&stopwords=false&uniqueWords=true

http://localhost:3000/parse?str=This%20is%20parser&nouns=false&limit=2

```

### Result structure

Result type: [JSON string](http://json.org/example.html)

```
{
  "frequencies": [
      {
          "word": String,
          "frequency": Number
      }
  ],

  "properNouns": [ String ],

  "nouns": [ String ],

  "tokens": [ String ],

  "uniqueWords": [ String ],

}
```

#### Example results

str = "I am a movie fanatic. When friends want to know what picture won the Oscar in 1980 or who played the police chief in Jaws, they ask me. My friends, though, have stopped asking me if I want to go out to the movies. The problems in getting to the theater, the theater itself, and the behavior of some patrons are all reasons why I often wait for a movie to show up on TV."


```bash
str=I%20am%20a%20movie%20fanatic.%20When%20friends%20want%20to%20know%20what%20picture%20won%20the%20Oscar%20in%201980%20or%20who%20played%20the%20police%20chief%20in%20Jaws%2C%20they%20ask%20me.%20My%20friends%2C%20though%2C%20have%20stopped%20asking%20me%20if%20I%20want%20to%20go%20out%20to%20the%20movies.%20The%20problems%20in%20getting%20to%20the%20theater%2C%20the%20theater%20itself%2C%20and%20the%20behavior%20of%20some%20patrons%20are%20all%20reasons%20why%20I%20often%20wait%20for%20a%20movie%20to%20show%20up%20on%20TV.
```

* #### Default settings
  ```
  { frequencies:
   [ { word: 'the', frequency: 7 },
     { word: 'to', frequency: 5 },
     { word: 'I', frequency: 3 },
     { word: 'in', frequency: 3 },
     { word: 'a', frequency: 2 },
     { word: 'movie', frequency: 2 },
     { word: 'friends', frequency: 2 },
     { word: 'want', frequency: 2 },
     { word: 'me', frequency: 2 },
     { word: 'theater', frequency: 2 },
     { word: 'what', frequency: 1 },
     { word: 'picture', frequency: 1 },
     { word: 'won', frequency: 1 },
     { word: 'TV', frequency: 1 },
     { word: 'Oscar', frequency: 1 },
     { word: 'fanatic', frequency: 1 },
     { word: 'or', frequency: 1 },
     { word: 'who', frequency: 1 },
     { word: 'played', frequency: 1 },
     { word: 'police', frequency: 1 },
     { word: 'chief', frequency: 1 },
     { word: 'Jaws', frequency: 1 },
     { word: 'they', frequency: 1 },
     { word: 'ask', frequency: 1 },
     { word: 'When', frequency: 1 },
     { word: 'My', frequency: 1 },
     { word: 'though', frequency: 1 },
     { word: 'am', frequency: 1 },
     { word: 'stopped', frequency: 1 },
     { word: 'asking', frequency: 1 },
     { word: 'if', frequency: 1 },
     { word: 'go', frequency: 1 },
     { word: 'out', frequency: 1 },
     { word: 'movies', frequency: 1 },
     { word: 'problems', frequency: 1 },
     { word: 'getting', frequency: 1 },
     { word: 'know', frequency: 1 },
     { word: 'itself', frequency: 1 },
     { word: 'and', frequency: 1 },
     { word: 'behavior', frequency: 1 },
     { word: 'of', frequency: 1 },
     { word: 'some', frequency: 1 },
     { word: 'patrons', frequency: 1 },
     { word: 'are', frequency: 1 },
     { word: 'all', frequency: 1 },
     { word: 'reasons', frequency: 1 },
     { word: 'why', frequency: 1 },
     { word: 'often', frequency: 1 },
     { word: 'wait', frequency: 1 },
     { word: 'for', frequency: 1 },
     { word: 'show', frequency: 1 },
     { word: 'up', frequency: 1 },
     { word: 'on', frequency: 1 },
     { word: 'have', frequency: 1 } ],
  nouns:
   [ 'movie',
     'friends',
     'theater',
     'picture',
     'TV',
     'Oscar',
     'fanatic',
     'police',
     'Jaws',
     'movies',
     'problems',
     'behavior',
     'patrons',
     'reasons',
     'show' ] }

  ```

* #### limit=10&uniqueWords=true

  ```
  { frequencies:
   [ { word: 'the', frequency: 7 },
     { word: 'to', frequency: 5 },
     { word: 'I', frequency: 3 },
     { word: 'in', frequency: 3 },
     { word: 'a', frequency: 2 },
     { word: 'movie', frequency: 2 },
     { word: 'friends', frequency: 2 },
     { word: 'want', frequency: 2 },
     { word: 'me', frequency: 2 },
     { word: 'theater', frequency: 2 } ],
  uniqueWords:
   [ 'the',
     'to',
     'I',
     'in',
     'a',
     'movie',
     'friends',
     'want',
     'me',
     'theater',
     'what',
     'picture',
     'won',
     'TV',
     'Oscar',
     'fanatic',
     'or',
     'who',
     'played',
     'police',
     'chief',
     'Jaws',
     'they',
     'ask',
     'When',
     'My',
     'though',
     'am',
     'stopped',
     'asking',
     'if',
     'go',
     'out',
     'movies',
     'problems',
     'getting',
     'know',
     'itself',
     'and',
     'behavior',
     'of',
     'some',
     'patrons',
     'are',
     'all',
     'reasons',
     'why',
     'often',
     'wait',
     'for',
     'show',
     'up',
     'on',
     'have' ],
  nouns:
   [ 'movie',
     'friends',
     'theater',
     'picture',
     'TV',
     'Oscar',
     'fanatic',
     'police',
     'Jaws',
     'movies',
     'problems',
     'behavior',
     'patrons',
     'reasons',
     'show' ] }
  ```

* #### limit=10&nouns=false&tokens=true

  ```
  { tokens:
   [ 'I',
     'am',
     'a',
     'movie',
     'fanatic',
     'When',
     'friends',
     'want',
     'to',
     'know',
     'what',
     'picture',
     'won',
     'the',
     'Oscar',
     'in',
     'or',
     'who',
     'played',
     'the',
     'police',
     'chief',
     'in',
     'Jaws',
     'they',
     'ask',
     'me',
     'My',
     'friends',
     'though',
     'have',
     'stopped',
     'asking',
     'me',
     'if',
     'I',
     'want',
     'to',
     'go',
     'out',
     'to',
     'the',
     'movies',
     'The',
     'problems',
     'in',
     'getting',
     'to',
     'the',
     'theater',
     'the',
     'theater',
     'itself',
     'and',
     'the',
     'behavior',
     'of',
     'some',
     'patrons',
     'are',
     'all',
     'reasons',
     'why',
     'I',
     'often',
     'wait',
     'for',
     'a',
     'movie',
     'to',
     'show',
     'up',
     'on',
     'TV' ],
  frequencies:
   [ { word: 'the', frequency: 7 },
     { word: 'to', frequency: 5 },
     { word: 'I', frequency: 3 },
     { word: 'in', frequency: 3 },
     { word: 'a', frequency: 2 },
     { word: 'movie', frequency: 2 },
     { word: 'friends', frequency: 2 },
     { word: 'want', frequency: 2 },
     { word: 'me', frequency: 2 },
     { word: 'theater', frequency: 2 } ] }
  ```

* #### stopwords=false&nouns=false

  ```
  { frequencies: 
   [ { word: 'movie', frequency: 2 },
     { word: 'friends', frequency: 2 },
     { word: 'want', frequency: 2 },
     { word: 'theater', frequency: 2 },
     { word: 'know', frequency: 1 },
     { word: 'picture', frequency: 1 },
     { word: 'won', frequency: 1 },
     { word: 'Oscar', frequency: 1 },
     { word: 'played', frequency: 1 },
     { word: 'police', frequency: 1 },
     { word: 'chief', frequency: 1 },
     { word: 'Jaws', frequency: 1 },
     { word: 'fanatic', frequency: 1 },
     { word: 'stopped', frequency: 1 },
     { word: 'asking', frequency: 1 },
     { word: 'movies', frequency: 1 },
     { word: 'problems', frequency: 1 },
     { word: 'getting', frequency: 1 },
     { word: 'TV', frequency: 1 },
     { word: 'behavior', frequency: 1 },
     { word: 'patrons', frequency: 1 },
     { word: 'reasons', frequency: 1 },
     { word: 'wait', frequency: 1 },
     { word: 'ask', frequency: 1 } ] }

  ```



* #### stopwords=false&limit=5&nouns=false&properNouns=true

  ```
  { frequencies: 
   [ { word: 'movie', frequency: 2 },
     { word: 'friends', frequency: 2 },
     { word: 'want', frequency: 2 },
     { word: 'theater', frequency: 2 },
     { word: 'know', frequency: 1 } ],
  properNouns: [ 'Oscar', 'Jaws' ] }


  ```
