import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

interface SignInProps { 
    email: string;
    password: string;


}
const prisma = new PrismaClient();

const SignInController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as SignInProps;

        // Find user by email
        const user = await prisma.userdata.findFirst({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // Successful sign-in
        return res.status(200).json({ message: "Sign in successfully" });
    } catch (error) {
        console.error("Error during sign-in:", error);
        return res.status(500).json({ message: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
};

export default SignInController;
