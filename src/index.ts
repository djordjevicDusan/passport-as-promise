import passportModule, {AuthenticateOptions, Strategy} from "passport"

export class PassportAsPromise {
  use(strategy: Strategy, name?: string): this {
    if (name) {
      passportModule.use(name, strategy)
      return this
    }
    passportModule.use(strategy)
    return this
  }
  authenticate(
    strategy: string | string[] | Strategy,
    options?: AuthenticateOptions,
  ): (...args: any[]) => Promise<any> {
    return (...args: any[]): Promise<any> => {
      return new Promise((res, rej) => {
        if (options) {
          passportModule.authenticate(strategy, options, (error, data) => {
            if (error) {
              return rej(error)
            }
            return res(data)
          })(...args)
        } else {
          passportModule.authenticate(strategy, (error, data) => {
            if (error) {
              return rej(error)
            }
            return res(data)
          })(...args)
        }
      })
    }
  }
}

const passportAsPromise = new PassportAsPromise()

export default passportAsPromise
