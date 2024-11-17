import { server } from "../src/server"
import Prisma from "../src/db";
import { Entry } from "@prisma/client";

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

//I included the non-active versions of most of the testing functions just for the sake of completeness
//They're commented out because Jest runs tests in parallel - which is why I nested them all in the active test.


//Backend test function
describe('Get full empty list, then create, then get, then update, then delete entry, finally getting full empty list again', () => {
  //expect(err);
  it("should pass all checks", () => {
    let testEntry: Entry = { id: "1", title: "title", description: "descr", created_at: new Date(), due_at: new Date() };
    server.inject({
      method: 'GET',
      url: '/get/'
    }, (err, response) => {
      //console.log(response.body);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual("[]");
      expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');

      server.inject({
        method: 'POST',
        url: '/create/',
        payload: testEntry,
      }, (err, response1) => {
        expect(response1.statusCode).toEqual(200);
        expect(response1.headers['content-type']).toEqual('application/json; charset=utf-8');

        server.inject({
          method: 'GET',
          url: '/get/'+1,
        }, (err, response2) => {
          //console.log(response.body);
          expect(response2.statusCode).toEqual(200);
          expect(response2.body).toEqual(JSON.stringify(testEntry));
          expect(response2.headers['content-type']).toEqual('application/json; charset=utf-8');

          let testEntry2: Entry = { id: "1", title: "title2", description: "descr2", created_at: new Date(), due_at: new Date() };
          server.inject({
            method: 'PUT',
            url: '/update/'+1,
            payload: testEntry2,
          }, (err, response3) => {
            expect(response3.statusCode).toEqual(200);
            expect(response3.headers['content-type']).toEqual('application/json; charset=utf-8');

            server.inject({
              method: 'GET',
              url: '/get/'+1,
            }, (err, response4) => {
              //console.log(response.body);
              expect(response4.statusCode).toEqual(200);
              expect(response4.body).toEqual(JSON.stringify(testEntry2));
              expect(response4.headers['content-type']).toEqual('application/json; charset=utf-8');

              server.inject({
                method: 'DELETE',
                url: '/delete/'+1,
              }, (err, response5) => {
                expect(response5.statusCode).toEqual(200);
                expect(response5.payload).toEqual('{"msg":"Deleted successfully"}')
                expect(response5.headers['content-type']).toEqual('application/json; charset=utf-8');

                server.inject({
                  method: 'GET',
                  url: '/get/'
                }, (err, response6) => {
                  expect(response6.statusCode).toEqual(200);
                  expect(response6.body).toEqual("[]");
                  expect(response6.headers['content-type']).toEqual('application/json; charset=utf-8');
                })
              })
            })
          })
        })
      })
    })
  })
})

//Non-active test functions

/*
//test for getting all entries (empty db check)
describe('GET `/get/` route (empty)', () => {
  //expect(err);
  it("should return 200 code and json", () => {
    server.inject({
      method: 'GET',
      url: '/get/'
    }, (err, response) => {
      //console.log(response.body);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual("[]");
      expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    })
  })
}*/

/*
//test for creating entry
describe('POST `/create/` route', () => {
  //expect(err);
  it("should return 200 code and the provided entry", () => {
    let testEntry: Entry = { id: "1", title: "title", description: "descr", created_at: new Date(), due_at: new Date() };
    server.inject({
      method: 'POST',
      url: '/create/',
      payload: testEntry,
    }, (err, response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    })
  })
})
*/

/*
//test for deleting entry
describe('DELETE `/delete/` route', () => {
  //expect(err);
  it("should return success message", () => {
    let testEntry: Entry = { id: "1", title: "title", description: "descr", created_at: new Date(), due_at: new Date() };
    server.inject({
      method: 'DELETE',
      url: '/delete/'+1,
    }, (err, response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.payload).toEqual('{"msg":"Deleted successfully"}')
      expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    })
  })
})*/

/*
//test for getting all entries
describe('GET `/get/` route (non-empty)', () => {
    //expect(err);
    it("should return 200 code and json", () => {
      server.inject({
        method: 'GET',
        url: '/get/'
      }, (err, response) => {
        //console.log(response.body);
      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    })
  })
})*/

/*
//test for updating entry
describe('PUT `/update/` route', () => {
  //expect(err);
  it("should return 200 code and the provided entry", () => {
    let testEntry: Entry = { id: "1", title: "title", description: "descr", created_at: new Date(), due_at: new Date() };
    server.inject({
      method: 'PUT',
      url: '/update/'+1,
      payload: testEntry,
    }, (err, response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    })
  })
})*/

/*
//test for getting specific entry
describe('GET `/get/` route (specific)', () => {
  //expect(err);
  it("should return 200 code and json", () => {
    server.inject({
      method: 'GET',
      url: '/get/'+1,
    }, (err, response) => {
      //console.log(response.body);
      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    })
  })
})*/
