import React, { useState } from 'react'
import styled from 'styled-components'

import dictionary from './dictionary'

const APP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  height: 100vh;
  background: #000;
`

const KBD = styled.div`
  display: flex;
  flex-direction: column;
  align-items: equal-spacing;
  direction: rtl;
  width: 100%;
`
// max-width: 42em;

const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
`

interface ButtonProps {
  readonly highlight: boolean;
  readonly wordContainsLetter: boolean;
  readonly typesComplete: boolean;
}

const KEY = styled.button<ButtonProps>`
  font-size: clamp(1em, 6vw, 3em);
  line-height: 1;
  padding: .1em .2em;
  flex: 1;
  background: #eee8;
  border: none;
  cursor: pointer;
  color: #000;
  font-family: monospace;
  ${props => props.wordContainsLetter && `background: #9d68;`}
  ${props => props.highlight && `background: #9d6;`}
  ${props => props.typesComplete && `background: #d2bf75;`}
  opacity: .75;
  transition: .25s ease all;
  white-space: pre;
  &:hover, &:focus {
    opacity: 1;
    transform: scale(1.1);
    background: #fff;
    z-index: 1;
  }
`

const SCREEN = styled.div`
  background: #000;
  color: #fff;
  text-align: center;
  width: 100%;
  label {
    color: #888;
    padding: .25em;
  }
`

const WORD = styled.div`
  font-size: 2em;
  text-align: center;
`

interface InputProps {
  readonly isCorrect: boolean;
}

const INPUT = styled.textarea<InputProps>`
  font-size: 3em;
  text-align: center;
  height: 1em;
  padding: .5em;
  line-height: 1;
  background: #c95;
  color: #fed;
  vertical-align: middle;
  ${props => props.isCorrect && `background: #6b5;`}
  &:empty {
    background: #999;
  }
`

const keyRows: Array<Array<string>> = [
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '⌫'].reverse(),
  ['ض','ص','ث','ق','ف','غ','ع','ه','خ','ح','ج', 'ذ','د'].reverse(),
  ['ط', 'ك', 'م', 'ن', 'ت', 'ا', 'ل', 'ب', 'ي', 'س', 'ش'],
  ['ظ', 'ز', 'و', 'ة', 'ى', 'ر', 'ؤ', 'ء', 'ئا'],
  ['ً', ' ']
]

const Piece = styled.div`
  width: 2em;
  height: 2em;
`

const Progress = styled.input`
  color: red;
  direction: rtl;
`

const DICT = styled.select`
  font-size: 2em;
  padding: .25em;
`

const NEXT = styled.button`
  padding: .5em;
  font-size: 1.5em;
  font-weight: bold;
  line-height: 1;
  border: 0;
  cursor: pointer;
  background: #222;
  color: #ddd;
`

const Title = styled.h1`
  kbd {
    padding: .25em;
    display: inline-block;
    background: #333;
  }
`

const EMOJIS = {
  '🌅': ['morning', 'sunrise', 'dawn'],
  '🌇': ['night', 'evening', 'dusk'],
  '👍': ['good', 'yes'],
  '🤏': ['small'],
  '🙏': ['thanks', 'please'],
  '😋': ['delicious', 'mmm', 'tasty'],
  '👁️': ['eye', 'see'],
  '👁️👍': ['beautiful'],
  '👁️👎': ['ugly'],
  '👍🌅': ['good morning'],
  '👍🕛': ['good afternoon'],
  '🧍👉🧍❓': ['how are you'],
  '👍🌇': ['good night', 'good evening'],
  '👋': ['hello', 'goodbye', 'bye'],
  '👎': ['bad', 'no'],
  '🎮😊': ['easy'],
  '🎮🥵': ['difficult'],
  '🅰️➡️⬅️🅱️': ['close', 'near'],
  '🅰️⬅️➡️🅱️': ['far'],
  '🚰': ['water'],
  '🍷': ['wine'],
  '☕': ['coffee', 'tea'],
  '🍺': ['beer', 'ale'],
  '0️⃣': ['zero'],
  '1️⃣': ['one'],
  '2️⃣': ['two'],
  '3️⃣': ['three'],
  '4️⃣': ['four'],
  '5️⃣': ['five'],
  '6️⃣': ['six'],
  '7️⃣': ['seven'],
  '8️⃣': ['eight'],
  '9️⃣': ['nine'],
  '🔟': ['ten'],
  '📆': ['calendar', 'day', 'today'],
  '📆👉': ['tomorrow'],
  '👈📆': ['yesterday'],
  '1️⃣📆': ['Monday'],
  '2️⃣📆': ['Tuesday'],
  '3️⃣📆': ['Wednesday'],
  '4️⃣📆': ['Thursday'],
  '5️⃣📆': ['Friday'],
  '6️⃣📆': ['Saturday'],
  '️7️⃣📆': ['Sunday'],
  '🖐✌️📆': ['week'],
  '7️⃣📆': ['day'],
  '3️⃣6️⃣5️⃣📆': ['year']
}

const NUM = styled.span`
  padding: .25em;
  line-height: 1;
  display: inline-block;
  vertical-align: middle;
  background: #111;
  min-width: 2em;
`

const AR_2_EN: {[index: string]: string} = {
  'ض': 'DH',
  'ص': 'S',
  'ث': 'sh',
  'ق': 'q',
  'ف': 'f',
  'غ': 'gh',
  'ع': '3',
  'ه': 'h',
  'خ': 'kh',
  'ح': 'H',
  'ج': 'j',
  'د': 'd',
  'ذ': 'dh',
  'ط': 'T',
  'ك': 'k',
  'م': 'm',
  'ن': 'n',
  'ت': 't',
  'ا': 'aa',
  'ل': 'l',
  'ب': 'b',
  'ي': 'ii',
  'س': 's',
  'ش': 'sh',
  'ظ': 'D',
  'ز': 'z',
  'و': 'w',
  'ة': 'at',
  'ى': 'a',
  'ر': 'r',
  'ؤ': 'u',
  'ء': 'h',
  'ئا': 'k',
  'ً': 'n',
  'ْ': '\''
}

function transliterate(arabic: String) {
  let transliteration = ''
  arabic.split('').forEach(char => {
    transliteration = `${transliteration}${AR_2_EN[char]}`
  })
  return transliteration
}

const SECTION = styled.section`
  padding: .5em;
`

function App() {
  const [dictIndex, setDictIndex] = useState<number>(-1)
  const [input, setInput] = useState<string>('')
  const nextLetterIndex = 0 || input.length
  const englishWords = Object.keys(dictionary)
  const wordEnglish = dictIndex in englishWords && englishWords[dictIndex]
  const word = wordEnglish && dictionary[wordEnglish] || ''
  const nextLetter = word ? word[nextLetterIndex] : ''

  const incorrectLetters = !word.includes(input)

  function type(letter: string) {
    let newInput = input + '' + letter
    if (letter === '⌫') newInput = input.slice(0, input.length - 1)
    setInput(newInput)
  }

  return (<APP>
    <SCREEN>
      <Title><kbd>🇬🇧 en</kbd> -&gt; <kbd>🇸🇩 ar</kbd></Title>
      <SECTION>
        <DICT placeholder="select a word" onChange={e => setDictIndex(Number.parseInt(e.target.value))} value={dictIndex}>
          <option value="-1"></option>
          {englishWords.map((en, index) => (<option value={index}>
            {(Object.entries(EMOJIS).find(([entryEmoji, entryWords]) => entryWords.includes(en)) || [''])[0] + ' '}
            {en}
          </option>))}
        </DICT>
      </SECTION>
      <SECTION>
        <NEXT style={{ opacity: dictIndex ? 1 : 0 }} onClick={() => [setDictIndex(0), setInput('')]}>⇤</NEXT>
        <NEXT onClick={() => [setDictIndex(dictIndex - 1), setInput('')]}>⇠</NEXT>
        <NUM>{dictIndex}</NUM>
        <input type="range" min={0} max={englishWords.length - 1} value={dictIndex} onChange={e => [setDictIndex(Number.parseInt(e.target.value)), setInput('')]} />
        {dictIndex < (englishWords.length - 1) ? <NEXT onClick={() => [setDictIndex(dictIndex + 1), setInput('')]}>⇢</NEXT> : null}
      </SECTION>
      <SECTION>
        <WORD>{word}</WORD>
        <WORD style={{ color: '#888' }}>{transliterate(word)}</WORD>
        <Progress type="range" min={0} max={word.length} value={input.length} />
      </SECTION>
      <SECTION>
        <INPUT value={input} onChange={e => setInput(e.target.value)} isCorrect={input === word} />
        {input?.length
          ? (input === word
              ? <NEXT onClick={() => [setDictIndex(dictIndex + 1), setInput('')]}>✅</NEXT>
              : <NEXT onClick={() => setInput('')}>❌</NEXT>)
          : null}
      </SECTION>
    </SCREEN>
    {word ? <KBD>
      {keyRows.map(row => (<Row>
        {row.map(letter => <KEY highlight={letter === nextLetter} wordContainsLetter={word.includes(letter)} typesComplete={input.includes(letter)} onClick={() => type(letter)}>{letter}</KEY>)}
      </Row>))}
    </KBD> : null}

  </APP>)
    // jigsaw
    // <Piece style={{ background: 'url(logo192.png)', clipPath: 'polygon(0 0, 0 40%, 20% 35%, 20% 65%, 0 60%, 0 100%, 100% 100%, 100% 0)' }} />
}

export default App
