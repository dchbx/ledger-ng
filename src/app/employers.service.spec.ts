
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, ResponseMethod } from '@angular/http';
import { EmployerService } from './employers.service';

describe( 'EmployerService', () => {
  
  let subject: EmployerService;
  let backend: MockBackend;
  
  let sampleEmployers = [
    { legal_name: "DC HBX", hbx_id: 1 }
  ];
  
  // Config before each test case
  beforeEach( () => {
    
    TestBed.configureTestingModule( {
      providers: [
        EmployerService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, defaultOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    } );
    
    // create a user token
    window.localStorage.setItem('currentUser', JSON.stringify( {
      token: "pseudo_valid_token",
      email: "test@test.com",
    } ) );
    
  } );
  
  // Inject our service and backend before each test
  beforeEach( inject( [EmployerService, MockBackend], (employerService, mockBackend) => { 
    subject = employerService;
    backend = mockBackend;
  } ) );
  
  describe( 'getEmployers()', () => {
    
    it( 'should make a GET request', (done) => {
      // Hook into the Mock HTTP Wrapper
      backend.connections.subscribe( (connection: MockConnection) => {
        expect( connection.request.method ).toEqual( 0 );
        
        // Send off the response
        let options = new ResponseOptions( { body: sampleEmployers } );
        connection.mockRespond( new Response( options ) );
      } );
      
      // Create the HTTP Request
      subject.getEmployers().subscribe( () => { done(); } );
    } );
    
    it( 'should return a table directly from the API', (done) => {
      // Hook into the Mock HTTP Wrapper
      backend.connections.subscribe( (connection: MockConnection) => {
        expect( connection.request.method ).toEqual( 0 );
        
        // Send off the response
        let options = new ResponseOptions( { body: sampleEmployers } );
        
        connection.mockRespond( new Response( options ) );
      } );
      
      // Create the HTTP Request
      subject.getEmployers().subscribe( (response) => { 
        expect( response ).toEqual( sampleEmployers );
        done();  
      } );
    } );
    
  } );
  
} );