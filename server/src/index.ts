import express, { json, Request } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import mongoose, { CallbackError } from "mongoose";
import { config } from "dotenv";
import passport from "passport";
import passportLocal from "passport-local";
import passportJwt, { VerifyCallback } from "passport-jwt";
import { compare } from "bcryptjs";
import User from "./models/User";
import { IUser } from "./types";
import authRouter from "./routes/user";
/**
 * @configure environment variables
 * */
config();
/**
 * @callback middlewares
 */
const app = express();
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
/**@middlewares */
app.use(json());
app.use(cors());
app.use(helmet());
/**
 * @middleware session
 * @param sessionOptions
 * */
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
/**
 * @param passportStrategy
 * @returns passportStatic
 */
const cookieExtractor = (req: Request): string | null => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: `${process.env.JWT_SECRET}`,
    },
    (payload: any, done: VerifyCallback | any) => {
      User.findOne(
        { _id: payload.sub },
        (err: CallbackError, user: IUser | null) => {
          if (err) return done(err, false);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      );
    }
  )
);
passport.use(
  new LocalStrategy((username: string, password: string, done: any) => {
    User.findOne(
      { username: username },
      (err: CallbackError, user: IUser | null) => {
        if (err) throw err;
        if (!user)
          return done(null, false, { message: "username is dosen't exist" });
        compare(password, user.password, (err: Error, result: boolean) => {
          if (err) throw err;
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "email or password is incorrect",
            });
          }
        });
      }
    );
  })
);
passport.serializeUser(
  (user: Express.User | any, done: (err: unknown, id: any) => void) => {
    done(null, user._id);
  }
);
passport.deserializeUser(
  (
    id: unknown,
    done: (err: unknown, user?: false | Express.User | null | undefined) => void
  ) => {
    User.findById(id, (err: CallbackError, user: IUser | null) => {
      let userInfo = {
        id: user?._id,
        username: user?.username,
        email: user?.email,
        isAdmin: user?.isAdmin,
      };
      done(err, userInfo);
    });
  }
);
/** @host */
const port = process.env.PORT ?? 5000;
const mongoUrl = `${process.env.MONGOURL}`;
/**
 * @method connect
 * @param url
 * @param options
 * @param callback
 * */
app.get("/", (req, res) => {
  res.json({ message: "home page here !!" });
});
app.use(authRouter);
mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err: unknown) => {
    if (err) throw err;
    console.log("db is connected");
  }
);
/** @method listening to the server port
 * @param port
 * @param callback
 * @return  void
 *  */
app.listen(port, () => {
  console.log("hello from express");
});
