import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root:{
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
});

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
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>생년월일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
            </TableBody>
          </Table>
        </Paper>
    ); 
  }
}

export default withStyles(styles)(App);
