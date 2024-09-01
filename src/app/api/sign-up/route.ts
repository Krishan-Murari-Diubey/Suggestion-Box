import { sendVerificationEmail } from "@/helpers/sendVarificationEmail";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/Users";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUserByName = await userModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserByName) {
      return Response.json(
        { success: false, message: "username is already taken" },
        { status: 400 }
      );
    }
    const existingUserByEmail = await userModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      true;
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new userModel({
        username,
        email,
        password: hashPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessage: true,
        messages: [],
        isVerified: false,
      });
      await newUser.save();
    }
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse) {
      return Response.json(
        { success: false, message: "Error registering user" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("error register user", error);
    return Response.json(
      {
        success: false,
        message: "error registering emails",
      },
      {
        status: 500,
      }
    );
  }
}
