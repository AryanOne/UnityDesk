import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {

        let list = await prisma.todos.findMany({});
        return Response.json(list);

    } catch (error) {

        console.error("Error fetching todos:", error);
        return Response.json(
            {
                msg: "Couldn't get the data"
            }
        );

    }
}

export async function POST(req: NextRequest) {
    try {
        
        const body = await req.json();
        const todo = body.content;
        console.log(body);

        if (!todo) {
            return Response.json(
                {
                    message: 'Todo content is required.'
                }
            );
        }

        await prisma.todos.create({
            data: {
                content: todo
            }
        });

        return Response.json(
            {
                message: "Added successfully.",
            }
        );

    } catch (error) {
        console.error("Error adding todo:", error);
        return Response.json(
            { message: 'Failed to add todo.' }
        );
    }
}

export async function PUT(req:NextRequest){

    const body=await req.json();
    const Id=body.id;
    const Done=body.done;

    try{
        await prisma.todos.update({
            where:{
                id:Id
            },
            data:{
                done:Done
            }
        })
        return Response.json({
            msg:"Updated Successfuly"
        })
    }catch(e){
        return Response.json({
            msg:`could'nt update item...${e}`
        })
    }

}