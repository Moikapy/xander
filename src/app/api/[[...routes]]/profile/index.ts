import {Elysia,t}from "elysia";
import {jwt}from "@elysiajs/jwt";
import {ObjectId}from "mongodb";
import DAO from "@/dao";
const profile_routes = new Elysia({
  serve: {
    maxRequestBodySize: 1024 * 1024 * 8,
  },
})
// Get Profile
.get("/profile",async({jwt,db,usersCollection})=>{
    const user = await usersCollection.findOne({email:jwt.email});
    if(user){
        return{
        status:200,
        body:{
            message:"User found",
            user,
        },
        };
    }
    return{
        status:404,
        body:{
        message:"User not found",
        },
    };
});
export default profile_routes;