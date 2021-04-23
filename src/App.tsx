import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

import Heatmap from './Heatmap'

import dictionary from './dictionary'

const APP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  height: 100vh;
  overflow: hidden;
  background: #000;
`

const onAppear = keyframes`
  0% {
    opacity: 0;
    transform: perspective(100vw) rotate3d(-1, 0, 0,
-90deg);
    perspective-origin: top;
    height: 0;
    overflow: hidden;
  }
  100% {
    opacity: 1;
    transform: perspective(100vw) rotate3d(-1, 0, 0,
0);
    perspective-origin: top;
    height: 100%;
  }
`

interface KbdProps {
  readonly show: boolean;
}

  // position: fixed;
  // bottom: 0;
const KBD = styled.div<KbdProps>`
  display: flex;
  flex-direction: column;
  align-items: equal-spacing;
  direction: rtl;
  width: 100%;
  animation: ${onAppear} 1s ease;
  ${props => props.show && `background: #111; animation:;` || `height: 0; overflow: hidden;`}
  background: #222;
`

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
  position: relative;
  font-size: clamp(1em, 6vw, 3em);
  line-height: 1;
  padding: .2em .1em;
  margin: .05em;
  flex: 1;
  background: #eee8;
  border: none;
  cursor: pointer;
  color: #000;
  font-family: monospace;
  opacity: .75;
  transition: .25s ease all;
  white-space: pre;
  border-radius: .25em;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
    background: #eee;
    z-index: 1;
  }
  &:hover, &:focus {
    opacity: 1;
    transform: scale(1.1);
    z-index: 1;
  }
  ${props => props.wordContainsLetter && `background: #9d68;`}
  ${props => props.typesComplete && `background: #666;`}
  ${props => props.highlight && `
  background: #9d6f;
  &:hover, &:focus {
    background: #9d6f;
  }
  `}
`
    // background: #fff;

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
  background: #777;
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
  ['ً', ' ', 'َ']
]

const Piece = styled.div`
  width: 2em;
  height: 2em;
`

const Progress = styled.input`
  flex: 1;
  background: transparent;
  box-shadow: inset 0 0 1em 1em #000b;

`
  // direction: rtl;

interface DictProps {
  readonly noValue: boolean;
}

const DICT = styled.select<DictProps>`
  font-size: 2em;
  padding: .25em;
  max-width: 50vw;
  background: transparent;
  color: inherit;
  border-color: transparent;
  &:hover {
    background: #222;
    border-color: #333;
  }
  color: #fff;
  & > option:first-child {
    color: #888;
  }
  ${props => props.noValue && `color: #888;`}
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
  '3️⃣6️⃣5️⃣📆': ['year'],
  '❤️': ['love'],
  '💼': ['work']
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
  'ْ': '\'',
  'أ': 'ʔ',
  'إ': 'ʔi',
  ' ': ' ',
  'َ': 'a'
}

function transliterate(arabic: String) {
  let transliteration = ''
  arabic.split('').forEach(char => {
    if (char in AR_2_EN) transliteration = `${transliteration}${AR_2_EN[char]}`
  })
  return transliteration
}

const SECTION = styled.section`
  padding: .5em;
`

const WORDS = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const TRANSLIT = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  font-size: .4em;
  color: #bbbf;
  opacity: 1;
  padding: .25em;
`

function App() {
  const { hash } = window.location
  const hashWord = hash ? hash.slice(1).replace('+', ' ') : ''

  const englishWords = Object.keys(dictionary)

  const defaultDictIndex = (hashWord && englishWords.indexOf(hashWord)) || -1

  const [dictIndex, setDictIndex] = useState<number>(defaultDictIndex)
  const [input, setInput] = useState<string>('')
  const nextLetterIndex = 0 || input.length
  const wordEnglish = dictIndex in englishWords && englishWords[dictIndex]
  const word = wordEnglish && dictionary[wordEnglish] || ''
  let nextLetter = word ? word[nextLetterIndex] : ''

  const incorrectLetters = !word.includes(input)
  if (incorrectLetters) nextLetter = '⌫'

  function type(letter: string) {
    let newInput = input + '' + letter
    if (letter === '⌫') newInput = input.slice(0, input.length - 1)
    setInput(newInput)
  }

  return (<APP>
    <SCREEN>
      <Title><kbd>🇬🇧 en</kbd> ⇒ <kbd>عر 🇸🇩</kbd></Title>
      <SECTION style={{ display: 'flex', alignItems: 'center' }}>
        {dictIndex >= 0
          ? (<>
              <NEXT style={{ opacity: dictIndex ? 1 : 0 }} onClick={() => [setDictIndex(0), setInput('')]}>⇤</NEXT>
              <NEXT onClick={() => [setDictIndex(dictIndex - 1), setInput('')]}>⇠</NEXT>
              <NUM>{dictIndex + 1}</NUM>
            </>)
          : (<>
            </>)}
        <Progress type="range" min={0} max={englishWords.length - 1} value={dictIndex} onChange={e => [setDictIndex(Number.parseInt(e.target.value)), setInput('')]} />
        <NUM>{englishWords.length}</NUM>
        {dictIndex < (englishWords.length - 1) ? <NEXT onClick={() => [setDictIndex(dictIndex + 1), setInput('')]}>⇢</NEXT> : null}
      </SECTION>
      <SECTION style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <DICT placeholder="select a word" onChange={e => [setDictIndex(Number.parseInt(e.target.value)), setInput('')]} value={dictIndex} noValue={dictIndex < 0}>
            <option value="-1">select a word</option>
            {englishWords.map((en, index) => (<option value={index}>
              {(Object.entries(EMOJIS).find(([entryEmoji, entryWords]) => entryWords.includes(en)) || [''])[0] + ' '}
              {en}
            </option>))}
          </DICT>
        </div>
        {dictIndex >= 0 ? <span style={{ padding: '1em', fontWeight: 'bold' }}>⇒</span> : null}
        <div>
          {dictIndex >= 0 ? <SECTION>
            <WORDS style={{ display: 'flex', flexDirection: 'column' }}>
              <WORD
                onClick={() => {
                  // const synth = window.speechSynthesis
                  // let utter = new SpeechSynthesisUtterance(transliterate(word))
                  // utter.lang = 'en-GB'
                  // // let utter = new SpeechSynthesisUtterance(word)
                  // // utter.lang = 'ar-XA'
                  // synth.speak(utter)
                }}>
                {word}
              </WORD>
              <WORD style={{ color: '#444' }}>{word.split('').map(char => transliterate(char)).join('')}</WORD>
            </WORDS>
          </SECTION> : null}
        </div>
      </SECTION>
    </SCREEN>
    <KBD show={!!word}>
      <Row>
        {word ? <SECTION>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <INPUT value={input} onChange={e => setInput(e.target.value)} isCorrect={input === word} />
            {input?.length
              ? (input === word
                  ? <NEXT onClick={() => [setDictIndex(dictIndex + 1), setInput('')]}>✅</NEXT>
                  : <NEXT onClick={() => setInput('')}>❌</NEXT>)
              : null}
          </div>
        </SECTION> : null}
      </Row>
      {keyRows.map(row => (<Row>
        {row.map(letter => (<KEY
          highlight={letter === nextLetter}
          wordContainsLetter={word.includes(letter)}
          typesComplete={input.includes(letter)}
          onClick={() => type(letter)}>
          {letter}
          <TRANSLIT>{transliterate(letter)}</TRANSLIT>
        </KEY>))}
      </Row>))}
    </KBD>
    <Heatmap />
  </APP>)
    // jigsaw
    // <Piece style={{ background: 'url(logo192.png)', clipPath: 'polygon(0 0, 0 40%, 20% 35%, 20% 65%, 0 60%, 0 100%, 100% 100%, 100% 0)' }} />
}

export default App
