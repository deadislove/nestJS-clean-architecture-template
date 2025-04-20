import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export class PostgresDatabase {
    constructor(private readonly configService: ConfigService) {}
    
    getConnection(): TypeOrmModuleOptions  {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST', 'localhost'),
            port: this.configService.get<number>('DB_PORT', 5432),
            username: this.configService.get<string>('DB_USERNAME', 'user'),
            password: this.configService.get<string>('DB_PASSWORD', 'password'),
            database: this.configService.get<string>('DB_NAME', 'my_database'),
            entities: [],
            synchronize: false, // Set to false in production
            logging: false, // Disable logging in production
        }
    }
}