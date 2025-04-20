import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export class MySQLDatabase {
    constructor(private readonly configService: ConfigService) {}

    getConnection(): TypeOrmModuleOptions  {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST', 'localhost'),
            port: this.configService.get<number>('DB_PORT', 3306),
            username: this.configService.get<string>('DB_USERNAME', 'root'),
            password: this.configService.get<string>('DB_PASSWORD', 'password'),
            database: this.configService.get<string>('DB_NAME', 'database'),
            entities: [],
            synchronize: false, // Set to false in production
            logging: false, // Disable logging in production
        }
    }
}