import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { ProductTypeOrmEntity, UserTypeOrmEntity } from "@infra/persistence/typeorm/entities";

export class SQLiteDatabase {
    constructor(private readonly configService: ConfigService) {}
    
    getConnection(): TypeOrmModuleOptions {
        return {
            type: 'sqlite',
            database: `./database.sqlite`,
            //database: this.configService.get<string>('DB_NAME', `database.sqlite`),
            entities: [
                UserTypeOrmEntity,
                ProductTypeOrmEntity
            ],
            synchronize: true
        }
    }
}