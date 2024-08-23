import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

const prisma = new PrismaClient();

const SignUpController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body as SignUpProps;

    // Validate incoming data
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in the database
    const signupdata = await prisma.userdata.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    if (!signupdata) {
      throw new Error('User creation failed');
    }

    res.status(201).json({ message: 'User Created Successfully' });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(400).json({ message: 'Error creating user' });
  }
};

export default SignUpController;
