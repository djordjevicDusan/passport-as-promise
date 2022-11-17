# passport-as-promise

This module wraps [passport node.js
library](https://github.com/jaredhanson/passport) and provides 'Promise' interface instead of callback approach.

## installation

```shell
npm install passport-as-promise
```

## Usage

```ts
import passport from "passport-as-promise"

// Define strategy as usual
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({email})
      if (!user || !(await user.validPassword(password))) {
        return done(new UnauthorizedError())
      }
      return done(null, user)
    },
  ),
)

// Authentication
try {
  const user = await passport.authenticate("local", {session: false})(req, res)
} catch (err: any) {
  // Handle error
}
```
