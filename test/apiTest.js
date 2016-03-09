var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API routes', function() {

    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
              .then(function() {
                  return knex.seed.run().then(function() {
                      done()
                  });
              });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });

    describe('Get all shows', function() {

        it('should get all shows', function(done) {
            chai.request(server)
              .get('/api/shows')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('array');
                  res.body.length.should.equal(4);
                  res.body[0].should.have.property('name');
                  res.body[0].name.should.equal('Suits');
                  res.body[0].should.have.property('channel');
                  res.body[0].channel.should.equal('USA Network');
                  res.body[0].should.have.property('genre');
                  res.body[0].genre.should.equal('Drama');
                  res.body[0].should.have.property('rating');
                  res.body[0].rating.should.equal(3);
                  res.body[0].should.have.property('explicit');
                  res.body[0].explicit.should.equal(false);
                  done();
              });
        });

    });


    describe('Get one show', function() {

        it('should get one show', function(done) {
            chai.request(server)
              .get('/api/shows/1')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('array');
                  res.body.length.should.equal(1);
                  res.body[0].should.have.property('name');
                  res.body[0].name.should.equal('Suits');
                  res.body[0].should.have.property('channel');
                  res.body[0].channel.should.equal('USA Network');
                  res.body[0].should.have.property('genre');
                  res.body[0].genre.should.equal('Drama');
                  res.body[0].should.have.property('rating');
                  res.body[0].rating.should.equal(3);
                  res.body[0].should.have.property('explicit');
                  res.body[0].explicit.should.equal(false);
                  done();
              });
        });

    });

    describe('Add a single show', function() {

        it('should add a single show', function(done) {
            chai.request(server)
              .post('/api/shows')
              .send({
                  name : 'testing',
                  channel : 'whatever',
                  genre : 'great',
                  rating : 1,
                  explicit : false
              })
              .end(function(err, res) {

                  chai.request(server)
                    .get('api/shows/' + res.body[0])
                    .end(function(error, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('array');
                        res.body.length.should.equal(1);
                        res.body[0].should.have.property('name');
                        res.body[0].name.should.equal('testing');
                        res.body[0].should.have.property('channel');
                        res.body[0].channel.should.equal('whatever');
                        res.body[0].should.have.property('genre');
                        res.body[0].genre.should.equal('great');
                        res.body[0].should.have.property('rating');
                        res.body[0].rating.should.equal(1);
                        res.body[0].should.have.property('explicit');
                        res.body[0].explicit.should.equal(false);
                    });
                  done();
              })
        })
    });

    describe('Update a show', function() {


        it('should edit a show', function(done) {
            chai.request(server)
              .put('/api/shows/1')
              .send({
                  name: 'Edited Suits',
                  channel : 'New Channel',
                  genre: 'Drama',
                  rating: 3,
                  explicit: false
              })
              .end(function(err, res) {

                  chai.request(server)
                    .get('/api/shows/' + res.body)
                    .end(function(error, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('array');
                        res.body.length.should.equal(1);
                        res.body[0].should.have.property('name');
                        res.body[0].name.should.equal('Edited Suits');
                        res.body[0].should.have.property('channel');
                        res.body[0].channel.should.equal('New Channel');
                        res.body[0].should.have.property('genre');
                        res.body[0].genre.should.equal('Drama');
                        res.body[0].should.have.property('rating');
                        res.body[0].rating.should.equal(3);
                        res.body[0].should.have.property('explicit');
                        res.body[0].explicit.should.equal(false);
                    });
                  done();
              });
        });
    });

  describe('Delete a show', function() {

    it('should edit a show', function(done) {
      chai.request(server)
        .delete('/api/shows/1')
        .end(function(err, res) {
            res.should.have.status(200);
          done();
        });
    });

  });


});

