import passportModule, {AuthenticateOptions, Strategy} from "passport"

export class PassportAsPromise {
  authenticate(strategy: string | string[] | Strategy): (...args: any[]) => Promise<any>
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
