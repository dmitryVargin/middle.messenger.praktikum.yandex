import {assert} from 'chai';
import HTTP from './HTTP';

const http = new HTTP('https://jsonplaceholder.typicode.com/todos/1');
const objTmpl = {
  completed: false,
  id: 1,
  title: 'delectus aut autem',
  userId: 1,
}
type ObjTmpl = {
  completed: false,
  id: 1,
  title: 'delectus aut autem',
  userId: 1,
}

describe('Test http', () => {
  it('http request works', () => new Promise((resolve) => {
      http.get('')
        .then((res) => JSON.parse(res.response) as ObjTmpl)
        .then((data) => {
          assert.deepEqual(data, objTmpl)
          resolve(data)
        })
    })
  );
});
