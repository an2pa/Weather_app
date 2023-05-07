const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const htpps=require("https");
const { Http2ServerRequest } = require("http2");
const cheerio = require("cheerio");
const fs = require("fs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/",function(req,res){
    var url="https://api.openweathermap.org/data/2.5/weather?q=Sarajevo&units=metric&appid=fb2f3ee54ceeb9e91f9b750669fe8586";
    htpps.get(url,function(response){
        response.on("data",function(data){  
            var respons=JSON.parse(data);
            console.log(respons);
            var icon=respons.weather[0].icon; 
            var img="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            var weather=respons.weather[0].main; 
            var maintemp=respons.main.temp;
            var mintemp=respons.main.temp_min;
            var maxtemp=respons.main.temp_max;
            fs.readFile("index.html", "utf8", function(err, data) {
                if (err) throw err;
            
                var $ = cheerio.load(data);
            
                $(".city").text("Sarajevo");
                $(".temp").text(maintemp+"°C");
                $(".weather").text(weather);
                $(".hi-low").text(mintemp+" / "+maxtemp);
                $(".icon").attr("src",img);

                res.send($.html());
      });
    })   
})  
})


app.post("/",function(req,res){
    var city=req.body.city;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=fb2f3ee54ceeb9e91f9b750669fe8586";

    htpps.get(url,function(response){
        response.on("data",function(data){  
            var respons=JSON.parse(data);
            console.log(respons);
            var icon=respons.weather[0].icon; 
            var img="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            var weather=respons.weather[0].main; 
            var maintemp=respons.main.temp;
            var mintemp=respons.main.temp_min;
            var maxtemp=respons.main.temp_max;
            fs.readFile("index.html", "utf8", function(err, data) {
                if (err) throw err;
            
                var $ = cheerio.load(data);
            
                $(".city").text(city);
                $(".temp").text(maintemp+"°C");
                $(".weather").text(weather);
                $(".hi-low").text(mintemp+" / "+maxtemp);
                $(".icon").attr("src",img);

                res.send($.html());
      });
    })   
})  
    
 /*   
    htpps.get(url,function(response){
        
        
        response.on("data",function(data){
            var respons=JSON.parse(data);
            console.log(respons);
            var icon=respons.weather[0].icon;
            var img="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write('<div style="position:relative; left:25%; background-color: lightblue; text-align:center;display: inline-block; width: 30%; padding: 10%;">');
            res.write('<img style="width: 20%;" src="'+img+'" alt="Weather icon">');
            res.write('<h1 style="background-color: lightblue; text-align:center;">Current temperature in '+city+ ' is: '+respons.main.temp+'&degC</h1>');
            res.write('<p style="background-color: lightblue; text-align:center;">');
            res.write('Minimum temperature is: '+respons.main.temp_min+'&degC</p><p style="background-color: lightblue; text-align:center;">Maximum temperature is: '+respons.main.temp_max+'&degC</p></div>');
            res.sendFile(__dirname+"/response.html");
            res.send();
        }) 
       

    })
*/
})

app.listen(3000);

