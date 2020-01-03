var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var data=[
    {
        name:"Cloud's Rest",
        image:"https://images.pexels.com/photos/3377538/pexels-photo-3377538.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"blah blah blah"
    },
    {
        name:"Beach Rest",
        image:"https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"blah blah blah"
    }, 
    {
        name:"Sun Rest",
        image:"https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"blah blah blah"
    }  
]
function seedDB(){
    Campground.remove({},function(err){
        // if(err){
        //     console.log(err);
        // } else
        //     console.log("removed campgrounds");
        // // add a few campgrounds
        // data.forEach(function(seed){
        //   Campground.create(seed,function(err,campground){
        //       if(err){
        //           console.log(err);
        //       } else{
        //           console.log("added a campground");
        //           Comment.create(
        //               {
        //                   text:"this place is great",
        //                   author:"Homer"
        //               },function(err,comment){
        //                   if(err){
        //                       console.log(err);
        //                   } else{
                              
        //                       campground.comments.push(comment);
        //                       campground.save();
        //                       console.log("created new comment");
        //                   }
                        
                         
        //               });
        //       }
        //   });
        // });
    });
    
}
module.exports=seedDB;