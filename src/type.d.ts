interface rulesUser {
    userName: [{
        required: boolean
        message: string
        trigger: string
     },
     {
        min: number
        max: number
        message: string
        trigger: string
     },
     {
        pattern: RegExp
        message: string
        trigger: string
     },
     {
        pattern: RegExp
        message: string
        trigger: string
     }]
     nickName: [{
        required: boolean
        message: string
        trigger: string
     }]
     password: [{
        required: boolean
        message: string
        trigger: string
     },
     {
        min: number
        max: number
        message: string
        trigger: string
     }]
     email: [{
        type: any
        message: string
        trigger: string[]
     }]
     phonenumber: [{
        pattern: RegExp
        message: string
        trigger: string
     }]
}

export {
    rulesUser
}