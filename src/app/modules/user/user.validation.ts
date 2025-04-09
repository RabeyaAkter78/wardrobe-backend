import { z } from "zod";

const userValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required",
        }).min(3).max(50),
        age: z.number().optional(),
        email: z.string({
            required_error: "email is required",
        }).email(),
        password: z.string({
            required_error: "password is required",
        }).min(6),
        photo: z.string().optional(),
        role: z.enum(["user", "admin"]).default("user"),
        userStatus: z.enum(["active", "inactive"]).default("active")
    })
})

export const userValidation = {
    userValidationSchema
}