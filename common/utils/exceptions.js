const mainException = ({
    message = "internal server error" , cause = 500 
})=>{
    throw new Error(message , {cause})
}

export const NotFoundException = (message)=>{
    mainException({
        message , cause : 404
    })
}

export const UnauthorizedException = (message)=>{
    mainException({
        message :"Unauthorized", cause : 401
    })
}

export const ConflictException = (message)=>{
    mainException({
        message , cause : 409
    })
}

export const ForbiddenException = (message)=>{
    mainException({
        message , cause : 403
    })
}

export const BadRequestException = (message)=>{
    mainException({
        message , cause : 400
    })
}