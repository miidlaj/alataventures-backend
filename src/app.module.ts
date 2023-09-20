import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSchema } from './portfolio/portfolio.schema';
import { PortfolioService } from './portfolio/portfolio.service';
import { PortfolioController } from './portfolio/portfolio.controller';
import { FileUploadService } from './file-upload/file-upload.service';
import { SharedModule } from './shared.module';
import { GalleryModule } from './gallery/gallery.module';
import { PartnerModule } from './partner/partner.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     uri: config.get<string>('MONGO_URL'),
    //   }),
    // }),
    // MongooseModule.forRoot(
    //   'mongodb+srv://alataventures:alataventures@cluster0.4tpnoht.mongodb.net/?retryWrites=true&w=majority',
    //   { dbName: 'alataventures' },
    // ),
    MongooseModule.forRoot(process.env.MONGO_URL, { dbName: 'alataventures' }),
    MongooseModule.forFeature([{ name: 'Portfolio', schema: PortfolioSchema }]),
    AuthModule,
    UsersModule,
    SharedModule,
    GalleryModule,
    PartnerModule,
    EmailModule,
  ],
  controllers: [AppController, PortfolioController],
  providers: [AppService, PortfolioService, FileUploadService],
})
export class AppModule {}
