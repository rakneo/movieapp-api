const loadtest = require('loadtest');
const { Random } = require("random-js");
const request  = require("request");
var fs = require("fs");
const random = new Random(); // uses the nativeMath engine
const urlSet =  [
  "http://142.93.217.8/mcq/register"
];
var concurrency = 100;
var total_req = 400;
var limitingSec = 1;
var limit = require("simple-rate-limiter");
var callApi = limit(function(url, callback) {
  request.get({url: url,time : true}, callback);
}).to(concurrency).per(limitingSec*1000);
fs.open('message.txt', 'a', (errr, fd) => {
for(i=0;i<total_req;i++)
{
    var urlIdx = random.integer(0, urlSet.length-1);
    var url = urlSet[urlIdx];
    callApi(url,function(err,res){
      if(res){
        var resp_url = res.request.uri.href;
        fs.appendFile(fd,new Date()+","+(new Date(res.timingStart))+","+resp_url+","+res.statusCode+","+res.elapsedTime+"\n");
      }else{
       // fs.appendFile(fd,new Date()+"::ERROR::"+err+"\n");
      }
    })
}
})