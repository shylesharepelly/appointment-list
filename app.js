const express = require("express");
const app = express();
const { List } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());



const flash = require("connect-flash");
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
const path = require('path');
app.use(express.static(path.join(__dirname,"public")));
app.set("views", path.join(__dirname, "views"));






app.get("/", async (request, response)=> {
  const totallist1 = await List.getlist();
  console.log("list of all Appointments ...");
  

  if(request.accepts('html')){
    response.render('index.ejs',{
        totallist1
    });
  }
  else{
    response.json({
        totallist1
    })
  }
});




app.post("/list", async (request, response)=> {
    console.log("request",request.body.title);
    const totallist = await List.getlist();
    const title=request.body.title;
    const time=request.body.time;
  try {
    const appointment = await List.addappointment(title,time);
    if(request.accepts('html')){
      return response.redirect("/");
    }
    else{
      return response.json(appointment);
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});


app.put("/list/:id",async (request, response) => {
  // const appointment1 = await List.findByPk(request.params.id);
  console.log("title1",request.body.title)
  try {
    await List.modifytitle(
      request.body.title,
      request.params.id
    );
      
    return response.redirect(`/`);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/list/:id", async function (request, response) {
    console.log("We have to delete a appointment with ID: ", request.params.id);
    try{
      const deleted=await List.destroy({where: {id: request.params.id} });
      if(request.accepts('html')){
        return response.redirect(`/`);
      }
      else{
        return response.json(deleted ? true : false);
      }
    }
    catch(error){
      console.log(error);
      return response.status(422).json(error);
      }
  });

module.exports = app;