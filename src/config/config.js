const config = {
  production: {
    secret: process.env.secret,
    MONGO_URI: process.env.MONGO_URI,
    port: process.env.PORT,
  },
  development: {
    secret: 'FATCA-SECRET-key',
   // MONGO_URI: 'mongodb://192.168.4.4/FATCA-DB',
    MONGO_URI: `mongodb+srv://Deepera:SjTJTWogZFBOJBmo@cluster0.h1vr1.mongodb.net/Fatca`,
    
    //  MONGO_URI: 'mongodb+srv://admin:MYpassword@fatca-db-lc12x.mongodb.net/test?retryWrites=true&w=majority',
    port: 3000,
  },
};

export const getConfig = env => config[env] || config.development;
