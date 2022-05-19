import React from 'react'
import axios from 'axios';

export default class AppClass extends React.Component {


  state = {
    currentCoordinate: [2,2],
    totalMoves: 0,
    board: [[1,1], [2,1], [3,1], [1,2], [2,2], [3,2], [1,3], [2,3], [3,3]],
    message: '',
    email: ''
  }

  onReset = () => {
    this.setState((prevState) => ({
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

  // loop through the val array, at each index check if its the same value of the currentCoordinate array at the same index

  isActive = (val) => {
    console.log('this is currentCoordinate', this.state.currentCoordinate)
    console.log('this is val', val)
      for(let i = 0; i < val.length; i++) {
        if (val[i] !== this.state.currentCoordinate[i])
        return false;
      }
      return true;
  }
  
  onSubmit = (evt) => {
    evt.preventDefault();

//     ## API

// - The application includes an endpoint reachable at `POST http://localhost:9000/api/result`.
// - You can experiment with this endpoint using an HTTP client like Postman.
// - The endpoint expects a payload like `{ "x": 1, "y": 2, "steps": 3, "email": "lady@gaga.com" }`:
//   - `x` should be an integer between 1 and 3.
//   - `y` should be an integer between 1 and 3.
//   - `steps` should be an integer larger than 0.
//   - `email` should be a valid email address.
// - Expect an "Unprocessable Entity" server response if the payload has the wrong shape.
    const URL = 'http://localhost:9000/api/result';
    const payload = { 'x': this.state.currentCoordinate[0], "y": this.state.currentCoordinate[1], "steps": this.state.totalMoves, "email": this.state.email }
    
    axios.post(URL, payload)
    .then(res => {
      const message = res.data.message
      console.log(payload)
      this.setState({message: message, email: '',})
    })
    .catch(err => {
      const errorMessage = err.response.data.message
      console.error(errorMessage)
      this.setState({message: errorMessage})
    })

  }

  onMove = (direction) => {
    switch(direction) {
      case 'left': {
        console.log('left')

        this.state.currentCoordinate[0] > 1 ?

        this.setState((prevState) => ({
          ...prevState,
          currentCoordinate: [
            prevState.currentCoordinate[0] - 1,
            prevState.currentCoordinate[1],
          ],
          totalMoves: prevState.totalMoves + 1,
          message: '',
        }))

        :

        this.setState((prevState) => ({
          ...prevState,
          message: "You can't go left",
        }));

        break;
      }
      case 'up': {
        console.log('up')
        
        console.log(this.isActive([2,2]))

        this.state.currentCoordinate[1] > 1 ?

          this.setState((prevState) => ({
            ...prevState,
            currentCoordinate: [
              prevState.currentCoordinate[0],
              prevState.currentCoordinate[1] - 1,
            ],
            totalMoves: prevState.totalMoves + 1,
            message: '',
          }))

        :

          this.setState((prevState) => ({
            ...prevState,
            message: "You can't go up",
          }));

        break;
      }
      case 'right': {
        console.log('right')

        this.state.currentCoordinate[0] < 3 ?

          this.setState((prevState) => ({
            ...prevState,
            currentCoordinate: [
              prevState.currentCoordinate[0] + 1,
              prevState.currentCoordinate[1],
            ],
            totalMoves: prevState.totalMoves + 1,
            message: '',
          }))

        :

          this.setState((prevState) => ({
            ...prevState,
            message: "You can't go right",
          }));

        break;
      }
      case 'down': {
        console.log('down')

        this.state.currentCoordinate[1] < 3 ?

          this.setState((prevState) => ({
            ...prevState,
            currentCoordinate: [
              prevState.currentCoordinate[0],
              prevState.currentCoordinate[1] + 1,
            ],
            totalMoves: prevState.totalMoves + 1,
            message: '',
          }))

        :

          this.setState((prevState) => ({
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

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.currentCoordinate[0]},{this.state.currentCoordinate[1]})</h3>
          <h3 id="steps">{this.state.totalMoves === 1 ? `You moved ${this.state.totalMoves} time` : `You moved ${this.state.totalMoves} times`}</h3>
        </div>
        <div id="grid">
          {this.state.board.map((val, idx) => {
            return (<div key={idx} className={this.isActive(val) ? 'square active' : 'square'}>
              {this.isActive(val) ? 'B' : ''}
            </div>)
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => this.onMove('left')} id="left">LEFT</button>
          <button onClick={() => this.onMove('up')} id="up">UP</button>
          <button onClick={() => this.onMove('right')} id="right">RIGHT</button>
          <button onClick={() => this.onMove('down')} id="down">DOWN</button>
          <button onClick={this.onReset} id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})}></input>
          <input id="submit" type="submit" onClick={(evt) => this.onSubmit(evt)}></input>
        </form>
      </div>
    )
  }
}
