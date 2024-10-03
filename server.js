const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const blogs = require("./model/blogs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
main()
  .then(() => {
    console.log("running");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Myblogs");
}
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
app.get("/blogs", async (req, res) => {
  let blogs1 = await blogs.find();
  res.render("blog.ejs", { b: blogs1 });
});
app.post("/submit", (req, res) => {
  let body = req.body;
  let blogtitle = body.btitle;
  let blogcontent = body.blog;
  blogs({
    blogtitle: blogtitle,
    blogcontent: blogcontent,
  }).save();
  res.redirect("/blogs");
});
app.get("/editblogs", async (req, res) => {
  let blogs2 = await blogs.find();
  res.render("editblogs.ejs", { b: blogs2 });
});
app.put("/editblogs/:id/edit", async (req, res) => {
  let id1 = req.params.id;
  let blogcontent = req.body.blogcontent;

  let updatedblogs = await blogs.findByIdAndUpdate(id1, {
    blogcontent: blogcontent,
  });

  res.redirect("/blogs");
});
app.delete("/deleted/:id/delete", async (req, res) => {
  let id1 = req.params.id;
  // let pname = req.body.pname;
  let deletedbloges = await blogs.findByIdAndDelete(id1);
  res.redirect("/blogs");
});

app.listen(port);
