import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';
import { UploadFileModule } from './upload-file/upload-file.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/store'), // 1.2 Setup the database
    MongooseModule.forRoot(process.env.DATA_URI),
    ProductModule,
    UserModule,
    AuthModule,
    CartModule,
    CategoryModule,
    MessagesModule,
    UploadFileModule,
  ],
})
export class AppModule {}
