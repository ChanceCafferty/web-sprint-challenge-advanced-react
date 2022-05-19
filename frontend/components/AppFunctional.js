import React, {useState} from 'react'
import axios from 'axios';

export default function AppFunctional(props) {

  const [state, setState] = useState({
    currentCoordinate: [2,2],
    totalMoves: 0,
    board: [[1,1], [2,1], [3,1], [1,2], [2,2], [3,2], [1,3], [2,3], [3,3]],
    message: '',
    email: ''
  })

  // START OF FUNCTIONS

  const onReset = () => {
    setState((prevState) => ({
      ...prevState,
      currentCoordinate: [
        prevState.currentCoordinate[0] = 2,
        prevState.currentCoordinate[1] = 2,
      ],
      totalMoves: prevState.totalMoves = 0,
      message: '',
      email: ''
    }));
  }

  const isActive = (val) => {
      for(let i = 0; i < val.length; i++) {
        if (val[i] !== state.currentCoordinate[i])
        return false;
      }
      return true;
  }

  const onSubmit = (evt) => {
    evt.preventDefault();

    const URL = 'http://localhost:9000/api/result';
    const payload = { 'x': state.currentCoordinate[0], "y": state.currentCoordinate[1], "steps": state.totalMoves, "email": state.email }
    
    axios.post(URL, payload)
    .then(res => {
      const message = res.data.message
      // setState({message: message, email: '',})
      setState((prevState) => ({
        ...prevState,
        message: message,
        email: ''
      }));
    })
    .catch(err => {
      const errorMessage = err.response.data.message
      // setState({message: errorMessage})
      setState((prevState) => ({
        ...prevState,
        message: errorMessage,
      }));
    })

  }

  const onMove = (direction) => {
    switch(direction) {
      case 'left': {
        state.currentCoordinate[0] > 1 ?

        setState((prevState) => ({
          ...prevState,
          currentCoordinate: [
            prevState.currentCoordinate[0] - 1,
            prevState.currentCoordinate[1],
          ],
          totalMoves: prevState.totalMoves + 1,
          message: '',
        }))

        :

        setState((prevState) => ({
          ...prevState,
          message: "You can't go left",
        }));

        break;
      }
      case 'up': {
        state.currentCoordinate[1] > 1 ?

          setState((prevState) => ({
            ...prevState,
            currentCoordinate: [
              prevState.currentCoordinate[0],
              prevState.currentCoordinate[1] - 1,
            ],
            totalMoves: prevState.totalMoves + 1,
            message: '',
          }))

        :

          setState((prevState) => ({
            ...prevState,
            message: "You can't go up",
          }));

        break;
      }
      case 'right': {
        state.currentCoordinate[0] < 3 ?

          setState((prevState) => ({
            ...prevState,
            currentCoordinate: [
              prevState.currentCoordinate[0] + 1,
              prevState.currentCoordinate[1],
            ],
            totalMoves: prevState.totalMoves + 1,
            message: '',
          }))

        :

          setState((prevState) => ({
            ...prevState,
            message: "You can't go right",
          }));

        break;
      }
      case 'down': {
        state.currentCoordinate[1] < 3 ?

          setState((prevState) => ({
            ...prevState,
            currentCoordinate: [
              prevState.currentCoordinate[0],
              prevState.currentCoordinate[1] + 1,
            ],
            totalMoves: prevState.totalMoves + 1,
            message: '',
          }))

        :

          setState((prevState) => ({
            ...prevState,
            message: "You can't go down",
          }));

        break;
      }
      default: {
        throw new Error('invalid direction')
      }
    }
  };

  // END OF FUNCTIONS

  return (
    <div id="wrapper" className={props.className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({state.currentCoordinate ? state.currentCoordinate[0] : 666},{state.currentCoordinate ? state.currentCoordinate[1] : 666})</h3>
          <h3 id="steps">{state.totalMoves === 1 ? `You moved ${state.totalMoves} time` : `You moved ${state.totalMoves} times`}</h3>
        </div>
        <div id="grid">
          {console.log(state)}
          {state.board.map((val, idx) => {
            return (<div key={idx} className={isActive(val) ? 'square active' : 'square'}>
              {isActive(val) ? 'B' : ''}
            </div>)
          })}
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => onMove('left')} id="left">LEFT</button>
          <button onClick={() => onMove('up')} id="up">UP</button>
          <button onClick={() => onMove('right')} id="right">RIGHT</button>
          <button onClick={() => onMove('down')} id="down">DOWN</button>
          <button onClick={onReset} id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" value={state.email} onChange={(evt) => setState((prevState) => ({ ...prevState, email: evt.target.value}))}></input>
          <input id="submit" type="submit" onClick={(evt) => onSubmit(evt)}></input>
        </form>
    </div>
  )
}