#!/usr/bin/env node
let coveralls = require('coveralls');
// let scoverageJson = require('../../target/scala-2.10/coveralls.json');
// let jsBasePath = "web-console/front/src"
let jsBasePath = "";

console.log("start");

process.stdin.resume();
process.stdin.setEncoding('utf8');

function handleInput(input, cb, userOptions) {
  //console.log('user options ' + userOptions);
  coveralls.getOptions((err, options) => {

    if (err){
      console.error("error from getOptions");
      cb(err);
      return;
    }
    //console.log(options);

    coveralls.convertLcovToCoveralls(input, options, (err, postData) => {
      if (err){
        console.error("error from convertLcovToCoveralls");
        cb(err);
        return;
      }

      let files1 = postData.source_files
        .filter( v => v.name.indexOf("__test__") === -1) //testを取り除く
        .map( v => {
          v.name = v.name.replace( /src/g , jsBasePath); //プロジェクトルートからの相対パスに直す
          return v;
        });
      console.log(files1);
      // let files2 = scoverageJson.source_files;
      // console.log(JSON.stringify(otherJson));
      Array.prototype.push.apply(files1/*, files2*/);
      postData.source_files = files1;

      coveralls.sendToCoveralls(postData, (err, response, body) => {
        if (err){
          cb(err);
          return;
        }
        if (response.statusCode >= 400){
          cb("Bad response: " + response.statusCode + " " + body);
          return;
        }
        console.log(response.statusCode);
        console.log(body);
        cb(null);
      });
    });
  }, userOptions);
}


let input = '';

process.stdin.on('data', function(chunk) {
  input += chunk;
});

process.stdin.on('end', function() {
  handleInput(input, function(err) {
    if (err) {
      throw err;
    }
  });
});

