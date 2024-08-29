export const statusCode ={
    SUCCESS:200,
    VALIDATION_ERROR:301,
    UNPROCESSABLE_ENTITY:422,
    AUTH_ERROR:401
}

export const JWT_TOKEN = 'process.env.SECRET_TOKEN' ;

export const DB_connect = 'process.env.MONGODB_URI';