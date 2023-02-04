import { getStateValueFromSetter } from "@/utils/functions";
import { MouseEvent as MouseEventReact, useCallback, useEffect, useState } from "react"
import { ITyper } from "..";
import useCalculator from "./useCalculator";
import useStatementGenerator from "./useStatementGenerator";

interface IPosition { top: string | number; left: string | number }

const initialResults = { speed: '0.00%', accuracy: '0wpm', seconds: '0s'}

export default function useTyper({options}: ITyper) {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [buffer, setBuffer] = useState<string>('');
  const [bufferHistory, setBufferHistory] = useState<string[]>([]);
  const [caretPosition, setCaretPosition] = useState<IPosition>({ top: '0px', left: '0px' });
  const [displayCaret, setDisplayCaret] = useState<boolean>(false);
  const [statement, setStatement] = useState<string[]>([]);
  const [testsCount, setTestsCount] = useState<number>(0);
  const [results, setResults] = useState(initialResults);


  /**
   * A flag that indicates whetherthe events is already added to elements
   */
  let isEventsSet = false;


  /**
   * Calling hooks
   */
  const { generateStatement } = useStatementGenerator();
  const { wpmCalculator } = useCalculator({
    statement,
    bufferHistory,
    buffer,
  });

  useEffect(() => {
    setResults(wpmCalculator.result()); 
  }, [caretPosition]);

  /**
   * Actions to do on the start of typign
   */
  const handleOnStartTyping = async () => {
    wpmCalculator.start();
  }


  /**
   * Actions to do on the start of typign
   */
  const handleOnStopTyping = async () => {
      await wpmCalculator.stop();
  }


  /**
   * Focus or Blue the Typer element
   */
  const focusAction = useCallback((state: boolean) => (e: MouseEventReact | MouseEvent | null) => {
    e?.stopPropagation();
    // @ts-ignore
    if(e && e?.target?.classList?.contains('option-btn')) {return}
    document.querySelector('body')?.setAttribute('data-active', state ? 'true' : 'false')
    return setIsActive(state);
  }, [])


  /**
   * Updates the Caret position depending on the active Letter Offset
   */
  const handleLetterCaretChange = useCallback((offset: IPosition) => {
    setCaretPosition((pos: any) => {
      if (pos.left === `${offset.left}px` && pos.top === `${offset.top}px`) return pos;
      return {
        left: `${offset.left}px`,
        top: `${offset.top}px`
      }
    })
  }, [])


  /**
   * Defining variables that store the states "beacuse I can't access the states after setting the event"
   */
  const getStatesValues = async () => {
    return {
      currentBuffer: await getStateValueFromSetter(setBuffer) || '',
      wordIdx: await getStateValueFromSetter(setActiveWordIndex) || 0,
      bufferHistory: await getStateValueFromSetter(setBufferHistory) || [],
      statement: await getStateValueFromSetter(setStatement) || [],
    }
  }


  /**
   * Handler that is called if the Backspace key is pressed
   */
  const handleBackspacePress = async (e: KeyboardEvent) => {
    let { currentBuffer, bufferHistory } = await getStatesValues();
    // clear the full word
    if (e.ctrlKey) await setBuffer('');

    // if free buffer go back to the last word
    if (bufferHistory.length && !currentBuffer.length) {
      await setActiveWordIndex(idx => idx - 1)
      await setBuffer(bufferHistory?.slice(-1)?.[0] || '');
      await setBufferHistory(h => h.slice(0, -1));
    }

    // delete the last character
    if (currentBuffer.length) setBuffer(buffer => currentBuffer = buffer.slice(0, -1).trim());
  }


  /**
   * Handler that is called if any letter is pressed
   */
  const handleLetterPress = async (e: KeyboardEvent) => {
    let { currentBuffer, statement, wordIdx } = await getStatesValues();
    if (!await wpmCalculator.status()) {
      await handleOnStartTyping();
    }
    if (currentBuffer.length >= 25) return;
    if (document.querySelector('body')?.getAttribute('data-active') !== 'true')
      return focusAction(true)(null);
    await setBuffer(buffer => currentBuffer = buffer + e.key);
    if (currentBuffer === statement[wordIdx] && wordIdx + 1 === statement.length) {
      await handleOnStopTyping();
    }
  }


  /**
   * Handler that is called if the Space key is pressed
   */
  const handleSpacePress = async (e: KeyboardEvent) => {
    let { currentBuffer } = await getStatesValues();
    if (!currentBuffer.length) return; // Prevent moving the next word without starting with the current
    await setBufferHistory(list => [...list, currentBuffer || '']);
    await setActiveWordIndex(idx => idx + 1)
    await setBuffer('');
  }


  /**
   * The function that handles any key press and Manages the Typer Element
   */
  const handleKeyboardKeyDown = async (e: KeyboardEvent) => {
    // if not valid key pressed return
    if (!e.key || !e.code) return;

    // prevent default actions for some keys
    if (!['Tab', 'F5', 'F12', 'Enter'].includes(e.key)) {
      e.preventDefault();
      if(await wpmCalculator.isStopped()) return;
    }
    e.stopPropagation();

    if (e.code === 'Backspace')
      return await handleBackspacePress(e);

    if (e.key === ' ')
      return await handleSpacePress(e);

    if (e.key.length === 1)
      return await handleLetterPress(e);
  }


  /**
   * Initializes all the round states
   */
  const initializeRound = async () => {
    // @ts-ignore
    document.querySelector("#hdn-in").focus();
    // Generate new statement
    setStatement(generateStatement({ type: 'dictionary', limit: options.numberOfWords }));
    // Clear the buffer
    setBuffer('');
    // Clear the buffer history
    setBufferHistory([]);
    // Restart the active index to the first word
    setActiveWordIndex(0);
    // Restart results
    setResults(initialResults);
    // Restart the wpmCalculator
    if(!await wpmCalculator.isStopped()) {
      wpmCalculator.refresh();
    }
  }


  /**
   * Make the typer active on the initialization
   */
  useEffect(() => {
    focusAction(true)(null);
  }, [])


  /**
   * Reinitializes all the round states and starts new Typing Test
   */
  useEffect(() => {
    (async () => {
      await initializeRound();
      // Focus the typer
      focusAction(true)(null);
    })() 
  }, [testsCount, options])


  /**
   * Toggles the display of the Caret depending on the state of the Typer Focus
   */
  useEffect(() => {
    if (!isActive) {
      setDisplayCaret(false);
      return;
    }
    setDisplayCaret(true);
  }, [isActive])


  /**
   * Adding Events on Initialization
   */
  useEffect(() => {
    if (!isEventsSet) {
      // mark as true so the events are set once
      isEventsSet = true;
      // blurring the typer box when clicking outside or resizing the window
      window.addEventListener("click", focusAction(false))
      window.addEventListener("resize", () => focusAction(false)(null))
      // handling keyboard inputs
      window.addEventListener("keydown", handleKeyboardKeyDown)
    }
  }, [typeof window !== 'undefined'])


  return {
    isActive,
    activeWordIndex,
    buffer,
    bufferHistory,
    caretPosition,
    displayCaret,
    statement,
    testsCount,
    results,
    setTestsCount,
    focusAction,
    handleLetterCaretChange
  }
}