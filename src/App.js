import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';
const customers = [{
  'id' : 1,
  'image': 'https://placeimg.com/64/64/1',
  'name' : '홍길동',
  'birthday' : '0318'
},
{
  'id' : 2,
  'image': 'https://placeimg.com/64/64/2',
  'name' : '다람쥐',
  'birthday' : '0408'
},
{
  'id' : 3,
  'image': 'https://placeimg.com/64/64/3',
  'name' : '개그맨',
  'birthday' : '1215'
}]

class App extends Component {
  render(){
      return (
        <div>
          {
            customers.map(c => {
              return(
                <Customer 
                  key= {c.key}
                  name= {c.name}
                  id= {c.id}
                  image= {c.image}
                  birthday= {c.birthday}
                  />
              );
            })
          }
        </div>
    );
  }
}

export default App;
