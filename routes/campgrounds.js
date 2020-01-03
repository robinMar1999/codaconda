// ROUTES
var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");
router.get("/",function(req,res){
   Campground.find({},function(err,campgrounds){
      if(err){
          console.log(err);
      } else{
          res.render("campgrounds/index",{campgrounds:campgrounds});
      }
   });
    
});
router.post("/",middleware.isLoggedIn,function(req,res){
   // get data from form and add to campground array
   var name=req.body.name;
   var price=req.body.price;
   var image=req.body.image;
   var description=req.body.description;
   var author={
       id:req.user._id,
       username:req.user.username
   };
   var newCampground={name:name,price:price,image:image,description:description,author:author};
   // create a new campground and save to db
   Campground.create(newCampground,function(err,newlyCreated){
       if(err){
           console.log(err);
           req.flash("error","There was some error!");
           res.redirect("/campgrounds");
       } else{
           // redirect back to campgrounds page
           res.redirect("/campgrounds");
       }
   });
   
   
});
router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
       if(err){
           req.flash("error","Campground not found!");
           console.log(err);
       } else{
           res.render("campgrounds/show",{campground:foundCampground});
       }
    });
    
});

// edit campground
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
        Campground.findById(req.params.id,function(err,foundCampground){
           if(err){
               req.flash("error","Campground not found!");
               res.redirect("/campgrounds");
           } else{
               res.render("campgrounds/edit",{campground:foundCampground});
           }
        });
});


router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   // find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
      if(err){
          req.flash("error","Campground not found!");
          res.redirect("/campgrounds");
      } else{
          req.flash("success","Successfully edited!");
          res.redirect("/campgrounds/"+req.params.id);
      }
   });
   // redirect somewhere
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           req.flash("error","Campground not found!");
           res.redirect("/campgrounds");
       } else{
           req.flash("success","Successfully deleted!");
           res.redirect("/campgrounds");
       }
   }) 
});



module.exports=router;