const express = require("express");
const app = express();
const { List } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", async (request, response)=> {
  const totallist = await List.getlist();
  console.log("list of all Appointments ...");
  

  if(request.accepts('html')){
    response.render('index.ejs',{
        totallist
    });
  }
  else{
    response.json({
        totallist
    })
  }
});




app.post("/list", async function (request, response) {
  try {
    const appointment = await List.addappointment({
    title:request.body.title,
    time:request.body.time
    
    });
    return response.json(appointment);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});



module.exports = app;