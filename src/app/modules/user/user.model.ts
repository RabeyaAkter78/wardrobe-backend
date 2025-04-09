import { model, Schema } from "mongoose";
import { IUSer } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";

const userSchema = new Schema<IUSer>({
    name: {
        type: String,
        required: [true, "name is required"],
        maxlength: 50,
        minlength: 3
    },
    age: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email format"
        },
        immutable: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    photo: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: "{VALUE} is not supported"
        },
        default: "user"
    },
    userStatus: {
        type: String,
        enum: {
            values: ["active", "inactive"],
            message: "{VALUE} is not supported"
        },
        default: "active"
    }
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    const user = this;
    // hash password
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcypt_salt_rounds)

    );
    next();
}),

    // set '' after saving password
    userSchema.post('save', function (doc, next) {
        doc.password = '';
        next();
    })
const User = model<IUSer>('User', userSchema);
export default User